// components/ScatterPlot.tsx
'use client'

import React from 'react'
import Plot from '@/components/Plot'
import { ArtistsData } from '@/types'
import { capitalize } from '@/utils/capitalize'

interface ScatterPlotProps {
  data: ArtistsData
}

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  const artistNames = Object.keys(data) as Array<keyof ArtistsData>

  const scatterData = artistNames.map((artist) => {
    const monthData = new Array(12)
      .fill(null)
      .map(() => ({ popularity: 0, count: 0 }))

    data[artist].forEach((song) => {
      const releaseDate = new Date(song.release_date)
      const month = releaseDate.getMonth()
      monthData[month].popularity += song.popularity
      monthData[month].count += 1
    })

    return {
      name: capitalize(artist.replace('_', ' ')),
      x: monthNames,
      y: monthData.map((data) =>
        data.count > 0 ? data.popularity / data.count : 0
      ),
      mode: 'lines+markers',
      type: 'scatter',
      text: monthData.map(
        (data, monthIndex) =>
          `Artist: ${capitalize(artist.replace('_', ' '))}<br>Month: ${monthNames[monthIndex]}<br>Avg Popularity: ${data.count > 0 ? (data.popularity / data.count).toFixed(2) : 0}`
      ),
      hoverinfo: 'text'
    }
  })

  return (
    <div>
      <Plot
        // @ts-ignore
        data={scatterData}
        layout={{
          title: 'Popularity vs. Release Month for All Artists',
          xaxis: {
            title: 'Month'
          },
          yaxis: {
            title: 'Average Popularity'
          },
          plot_bgcolor: 'rgba(0, 0, 0, 0)',
          paper_bgcolor: 'rgba(0, 0, 0, 0)',
          showlegend: true // Include a legend
        }}
      />
    </div>
  )
}

export default ScatterPlot
