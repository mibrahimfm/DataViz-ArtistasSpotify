'use client'

import React from 'react'
import Plot from 'react-plotly.js'
import { ArtistsData, Song } from '@/types'

interface PlotProps {
  data: ArtistsData
}

const PlotComponent: React.FC<PlotProps> = ({ data }) => {
  // Transform the data
  const processData = (data: ArtistsData) => {
    const allData: any[] = []

    Object.keys(data).forEach(artist => {
      const songs = data[artist as keyof ArtistsData]
      const yearlyData: { [year: string]: { maxPopularity: number, releases: number } } = {}

      songs.forEach(song => {
        const year = new Date(song.release_date).getFullYear().toString()

        if (!yearlyData[year]) {
          yearlyData[year] = { maxPopularity: song.popularity, releases: 1 }
        } else {
          yearlyData[year].maxPopularity = Math.max(yearlyData[year].maxPopularity, song.popularity)
          yearlyData[year].releases += 1
        }
      })

      Object.keys(yearlyData).forEach(year => {
        allData.push({
          artist,
          year,
          maxPopularity: yearlyData[year].maxPopularity,
          releases: yearlyData[year].releases
        })
      })
    })

    return allData
  }

  const processedData = processData(data)

  // Plot data
  const lineChartData = {
    x: processedData.map(d => d.year),
    y: processedData.map(d => d.maxPopularity),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Max Popularity',
    marker: { color: 'blue' }
  }

  const barChartData = {
    x: processedData.map(d => d.year),
    y: processedData.map(d => d.releases),
    type: 'bar',
    name: 'Releases',
    marker: { color: 'orange' }
  }

  return (
    <Plot
      data={[lineChartData, barChartData]}
      layout={{
        title: 'Maximum Popularity and Releases by Year for Each Artist',
        barmode: 'group',
        xaxis: { title: 'Year', tickangle: -45 },
        yaxis: { title: 'Popularity/Releases' },
        showlegend: true,
        legend: { x: 1, xanchor: 'right', y: 1 }
      }}
    />
  )
}

export default PlotComponent
