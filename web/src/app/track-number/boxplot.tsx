'use client'

import React from 'react'
import Plot from '@/components/Plot'
import { ArtistsData, Song } from '@/types'
import { capitalize } from '@/utils/capitalize'
import { Data } from 'plotly.js'

interface BoxPlotProps {
  data: ArtistsData
}

const BoxPlot: React.FC<BoxPlotProps> = ({ data }) => {
    const artistNames = Object.keys(data);
    const plotData:Data[] = artistNames.map(artist => {
      return {
        y: data[artist].map(song => song.popularity),
        type: 'box',
        name: capitalize(artist.replace('_', ' ')),
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