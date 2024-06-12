'use client'

import { ArtistsData } from '@/types'
import { capitalize } from '@/utils/capitalize'
import React from 'react'
import Plot from 'react-plotly.js'

interface ScatterPlotProps {
  artist: keyof ArtistsData
  data: ArtistsData
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ artist, data }) => {
  const songs = data[artist]

  const scatterData = songs.map((song) => ({
    release_date: new Date(song.release_date),
    popularity: song.popularity
  }))

  return (
    <div>
      <Plot
        data={[
          {
            x: scatterData.map((d) => d.release_date),
            y: scatterData.map((d) => d.popularity),
            mode: 'markers',
            type: 'scatter'
          }
        ]}
        layout={{
          title: `Popularity vs. Release Date for ${capitalize(artist.replace('_', ' '))}`,
          xaxis: {
            title: 'Release Date'
          },
          yaxis: {
            title: 'Popularity'
          }
        }}
      />
    </div>
  )
}

export default ScatterPlot
