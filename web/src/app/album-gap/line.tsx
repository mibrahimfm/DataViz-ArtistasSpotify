'use client'

import React from 'react'
import Plot from '@/components/Plot'
import { ArtistsData, Song } from '@/types'
import { capitalize } from '@/utils/capitalize'
import { Data } from 'plotly.js'

interface PlotProps {
  data: ArtistsData;
}

const AveragePopularityLinePlot: React.FC<PlotProps> = ({ data }) => {
  // Função para calcular a média de popularidade por artista e ano
  const calculateAveragePopularity = (data: ArtistsData) => {
    const avgPopularity = [];

    Object.keys(data).forEach(artist => {
      const songs = data[artist];
      const yearMap = new Map();

      songs.forEach(song => {
        const year = new Date(song.release_date).getFullYear();
        if (!yearMap.has(year)) {
          yearMap.set(year, { totalPopularity: 0, count: 0 });
        }
        const yearData = yearMap.get(year);
        yearData.totalPopularity += song.popularity;
        yearData.count += 1;
      });

      yearMap.forEach((value, year) => {
        avgPopularity.push({
          artist: capitalize(artist.replace('_', ' ')),
          year,
          popularity: value.totalPopularity / value.count
        });
      });
    });

    return avgPopularity;
  };

  const avgPopularityData = calculateAveragePopularity(data);

  const plotData: Data[] = Object.keys(data).map(artist => {
    const artistData = avgPopularityData.filter(d => d.artist === capitalize(artist.replace('_', ' ')));
    return {
      x: artistData.map(d => d.year),
      y: artistData.map(d => d.popularity),
      type: 'scatter',
      mode: 'lines',
      name: capitalize(artist.replace('_', ' '))
    };
  });

  return (
    <Plot
      data={plotData}
      layout={{
        title: 'Média de Popularidade dos Artistas por Ano',
        xaxis: { title: 'Ano' },
        yaxis: { title: 'Média de Popularidade' }
      }}
    />
  );
};

export default AveragePopularityLinePlot;
