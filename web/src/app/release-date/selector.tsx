// components/ArtistSelector.tsx
'use client'

import React, { useState } from 'react'
import { ArtistsData } from '@/types'
import Heatmap from './heatmap'
import { capitalize } from '@/utils/capitalize'
import ScatterPlot from './scatterplot'

interface ArtistSelectorProps {
  data: ArtistsData
}

const ArtistSelector: React.FC<ArtistSelectorProps> = ({ data }) => {
  const [selectedArtist, setSelectedArtist] =
    useState<keyof ArtistsData>('beatles')

  const handleArtistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArtist(event.target.value as keyof ArtistsData)
  }

  return (
    <div>
      <label htmlFor="artist-select">Choose an artist: </label>
      <select
        id="artist-select"
        value={selectedArtist}
        onChange={handleArtistChange}
      >
        {Object.keys(data).map((artist) => (
          <option key={artist} value={artist}>
            {capitalize(artist.replace('_', ' '))}
          </option>
        ))}
      </select>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Heatmap artist={selectedArtist} data={data} />
        <ScatterPlot artist={selectedArtist} data={data} />
      </div>
    </div>
  )
}

export default ArtistSelector
