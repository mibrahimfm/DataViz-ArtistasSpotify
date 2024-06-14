'use client'

import React, { useState } from 'react'
import Plot from '@/components/Plot'
import { ArtistsData } from '@/types'
import { capitalize } from '@/utils/capitalize'
import styles from './page.module.css'

interface LineChartProps {
  data: ArtistsData
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const [metric, setMetric] = useState('popularity')

  const artistNames = Object.keys(data) as Array<keyof ArtistsData>

  const aggregateDataByYear = (artistData: any[]) => {
    const yearlyData = artistData.reduce((acc, song) => {
      const year = new Date(song.release_date).getFullYear()
      if (!acc[year]) {
        acc[year] = { total: 0, count: 0 }
      }
      acc[year].total += song[metric]
      acc[year].count += 1
      return acc
    }, {})

    return Object.keys(yearlyData).map(year => ({
      year: parseInt(year),
      average: yearlyData[year].total / yearlyData[year].count
    }))
  }

  const chartData = artistNames.map((artist) => {
    const aggregatedData = aggregateDataByYear(data[artist])
    return {
      name: capitalize(artist.replace('_', ' ')),
      x: aggregatedData.map(item => item.year),
      y: aggregatedData.map(item => item.average),
      mode: 'lines+markers',
      hovertemplate: `<b>Artist:</b> ${capitalize(artist.replace('_', ' '))}<br><b>Year:</b> %{x}<br><b>${capitalize(metric)}:</b> %{y}<extra></extra>`,
    }
  })

  const metrics = ["acousticness","danceability","energy","instrumentalness","liveness","loudness","speechiness","tempo","valence","popularity","duration_ms"]

  return (
    <div className={styles.main}>
      <label htmlFor="metric-select">Select Metric</label>
      <select
        id="metric-select"
        value={metric}
        onChange={(e) => setMetric(e.target.value)}
        className={styles.select}
      >
        {metrics.map((metric) => (
          <option key={metric} value={metric}>
            {capitalize(metric)}
          </option>
        ))}
      </select>

      <Plot
        data={chartData}
        layout={{
          title: `${capitalize(metric)} vs. Release Year for All Artists`,
          width: 1200, 
          height: 800, 
          xaxis: {
            title: 'Year',
            tickmode: 'linear',
            tick0: Math.min(...chartData.flatMap(artist => artist.x)),
            dtick: 3,
            tickangle: -45,
            automargin: true,
          },
          yaxis: {
            title: `Average ${capitalize(metric)}`
          },
          plot_bgcolor: 'rgba(0, 0, 0, 0)',
          paper_bgcolor: 'rgba(0, 0, 0, 0)',
        }}
      />
    </div>
  )
}

export default LineChart
