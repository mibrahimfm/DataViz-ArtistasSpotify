import Plot from 'react-plotly.js';
import { mean, std, corr } from 'mathjs';
import { ArtistsData, Song } from '@/types'

interface Dataset {
  [key: string]: number[];
}

const calculateCorrelation = (x: number[][], y: number[]): number{
  
}

class Heatmap {
  private data: Dataset;

  constructor(data: Dataset) {
    this.data = data;
  }

  private calculateCorrelation(x: number[], y: number[]): number {
    const n = x.length;
    const xMean = mean(x);
    const yMean = mean(y);
    const xStd = std(x, 'uncorrected');
    const yStd = std(y, 'uncorrected');
    
    let covariance = 0;
    for (let i = 0; i < n; i++) {
      covariance += (x[i] - xMean) * (y[i] - yMean);
    }
    covariance /= n;

    return covariance / (xStd * yStd);
  }

  public plot(target: string, elementId: string): void {
    if (!this.data[target]) {
      throw new Error(`Target variable '${target}' not found in the dataset.`);
    }

    const targetValues = this.data[target];
    const variableNames = Object.keys(this.data).filter(key => key !== target);
    const correlations: number[] = [];

    variableNames.forEach(variable => {
      const variableValues = this.data[variable];
      const correlation = this.calculateCorrelation(variableValues, targetValues);
      correlations.push(correlation);
    });

    const trace = {
      x: [target],
      y: variableNames,
      z: [correlations],
      type: 'heatmap' as const,
      colorscale: 'RdBu',
      zmin: -1,
      zmax: 1,
      showscale: true,
      hoverongaps: false
    };

    const layout = {
      title: `Correlation Heatmap with ${target}`,
      xaxis: {
        title: 'Target Variable'
      },
      yaxis: {
        title: 'Variables'
      }
    };

    Plotly.newPlot(elementId, [trace], layout);
  }
}

// Example usage:
// Assuming you have an HTML element with id 'heatmap' to plot the heatmap
const data: Dataset = {
  'var1': [1, 2, 3, 4, 5],
  'var2': [5, 4, 3, 2, 1],