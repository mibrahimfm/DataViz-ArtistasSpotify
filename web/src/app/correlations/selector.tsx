'use client'

import React, { useState } from 'react';
import { ArtistsData } from '@/types'; // Adjust the path to your types as necessary
import { capitalize } from '@/utils/capitalize';
import CorrelationHeatmap from './heatmap';

interface ArtistSelectorProps {
  data: ArtistsData;
}

const ArtistSelector: React.FC<ArtistSelectorProps> = ({ data }) => {
  const [selectedArtist, setSelectedArtist] = useState<keyof ArtistsData>('beatles');

  const handleArtistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArtist(event.target.value as keyof ArtistsData);
  };

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
        {selectedArtist && <CorrelationHeatmap data={data} selectedArtist={selectedArtist} />}
      </div>
    </div>
  );
};

export default ArtistSelector;
