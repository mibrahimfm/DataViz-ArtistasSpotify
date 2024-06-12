'use client'

import { ArtistsData, Song } from '@/types'
import { capitalize } from '@/utils/capitalize'
import React from 'react'
import Plot from 'react-plotly.js'

interface HeatmapProps {
  artist: keyof ArtistsData
  data: ArtistsData
}

const createHeatmapData = (songs: Song[]) => {
  const allData = songs.map((song) => ({
    release_date: new Date(song.release_date)
  }))

  const yearMonthCount: { [key: string]: number } = {}

  allData.forEach(({ release_date }) => {
    const year = release_date.getFullYear()
    const month = release_date.getMonth() + 1 // JavaScript months are 0-11
    const key = `${year}-${month.toString().padStart(2, '0')}`
    if (!yearMonthCount[key]) {
      yearMonthCount[key] = 0
    }
    yearMonthCount[key]++
  })

  const years = Array.from(
    new Set(allData.map(({ release_date }) => release_date.getFullYear()))
  )
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  const z = months.map((month) =>
    years.map(
      (year) =>
        yearMonthCount[`${year}-${month.toString().padStart(2, '0')}`] || 0
    )
  )

  const hoverText = months.map((month) =>
    years.map(
      (year) =>
        `Year: ${year}<br>Month: ${month}<br>Releases: ${yearMonthCount[`${year}-${month.toString().padStart(2, '0')}`] || 0}`
    )
  )

  return { z, x: years, y: months, hoverText }
}

const Heatmap: React.FC<HeatmapProps> = ({ artist, data }) => {
  const heatmapData = createHeatmapData(data[artist])

  return (
    <div>
      <Plot
        data={[
          {
            z: heatmapData.z,
            x: heatmapData.x,
            y: heatmapData.y,
            type: 'heatmap',
            colorscale: 'YlGnBu',
            // @ts-ignore
            text: heatmapData.hoverText,
            hovertemplate: '%{text}<extra></extra>'
          }
        ]}
        layout={{
          title: `Song Releases for ${capitalize(artist.replace('_', ' '))}`,
          xaxis: {
            title: 'Year'
          },
          yaxis: {
            title: 'Month',
            tickmode: 'array',
            tickvals: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            ticktext: [
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
          }
        }}
      />
    </div>
  )
}

export default Heatmap
