'use client'

import React from 'react'
import Plot from 'react-plotly.js'
import { ArtistsData, Song } from '@/types'

interface ScatterPlotProps {
  data: ArtistsData
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
    const artistNames = Object.keys(data);
    const plotData = artistNames.map(artist => {
      return {
        x: data[artist].map(song => song.track_number),
        y: data[artist].map(song => song.popularity),
        mode: 'markers',
        type: 'scatter',
        name: artist
      };
    });
  
    return (
      <Plot
        data={plotData}
        layout={{
          title: 'Track Popularity vs. Track Number, Grouped by Artist',
          xaxis: { title: 'Track Number' },
          yaxis: { title: 'Popularity' },
        }}
      />
    );
  };
  
  export default ScatterPlot;