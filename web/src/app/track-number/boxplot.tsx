'use client'

import React from 'react'
import Plot from 'react-plotly.js'
import { ArtistsData, Song } from '@/types'

interface BoxPlotProps {
  data: ArtistsData
}

const BoxPlot: React.FC<BoxPlotProps> = ({ data }) => {
    const artistNames = Object.keys(data);
    const plotData = artistNames.map(artist => {
      return {
        y: data[artist].map(song => song.popularity),
        type: 'box',
        name: artist
      };
    });
  
    return (
      <Plot
        data={plotData}
        layout={{
          title: 'Popularidade da Faixa por Artista',
          xaxis: {
            title: 'Artista',
            tickangle: 45,
            tickmode: 'array',
            tickvals: artistNames
          },
          yaxis: {
            title: 'Popularidade'
          }
        }}
      />
    );
  };
  
  export default BoxPlot;