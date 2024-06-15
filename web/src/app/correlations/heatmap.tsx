import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Song, ArtistsData } from '@/types'; // Adjust the path to your types as necessary

interface CorrelationHeatmapProps {
  data: ArtistsData;
  selectedArtist: keyof ArtistsData;
}

type CorrelationData = {
  album: string;
  feature: string;
  correlation: number;
};

const quantitativeColumns: (keyof Song)[] = ['track_number', 'acousticness', 'danceability', 'energy', 'instrumentalness',
  'liveness', 'loudness', 'speechiness', 'tempo', 'valence', 'popularity', 'duration_ms'];

const getCorrelationMatrixByAlbum = (songs: Song[], selectedFeature: keyof Song): CorrelationData[] => {
  // Initialize correlation matrix
  const correlationMatrix: CorrelationData[] = [];

  // Iterate over each album
  const albumsSet = new Set(songs.map(song => song.album));
  albumsSet.forEach(album => {
    // Filter songs for the current album
    const albumSongs = songs.filter(song => song.album === album);
    // Calculate correlations for each feature in relation to the selected feature
    quantitativeColumns.forEach(feature => {
      if (feature !== selectedFeature) {
        const correlation = calculateCorrelation(albumSongs, feature, selectedFeature);
        correlationMatrix.push({ album: album, feature: feature, correlation: correlation });
      }
    });
  });

  return correlationMatrix;
};

const calculateCorrelation = (songs: Song[], col1: keyof Song, col2: keyof Song): number => {
  const values1 = songs.map(song => song[col1] as number);
  const values2 = songs.map(song => song[col2] as number);

  const mean1 = values1.reduce((a, b) => a + b) / values1.length;
  const mean2 = values2.reduce((a, b) => a + b) / values2.length;

  const numerator = values1.reduce((acc, val, idx) => acc + ((val - mean1) * (values2[idx] - mean2)), 0);
  const denominator = Math.sqrt(values1.reduce((acc, val) => acc + Math.pow(val - mean1, 2), 0) * values2.reduce((acc, val) => acc + Math.pow(val - mean2, 2), 0));

  return numerator / denominator;
};

const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({ data, selectedArtist }) => {
  const [correlationMatrix, setCorrelationMatrix] = useState<CorrelationData[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<keyof Song>('popularity');

  useEffect(() => {
    if (selectedArtist && data[selectedArtist]) {
      const songs = data[selectedArtist];
      const correlationData = getCorrelationMatrixByAlbum(songs, selectedFeature);
      setCorrelationMatrix(correlationData);
    }
  }, [data, selectedArtist, selectedFeature]);

  const albums = Array.from(new Set(correlationMatrix.map(data => data.album)));
  const features = quantitativeColumns.filter(feature => feature !== selectedFeature);

  // Prepare data for Plotly heatmap
  const heatmapData = {
    x: albums,
    y: features,
    z: features.map(feature => {
      return albums.map(album => {
        const correlationData = correlationMatrix.find(data => data.album === album && data.feature === feature);
        return correlationData ? correlationData.correlation : 0;
      });
    }),
    type: 'heatmap',
    colorscale: 'coolwarm',
    zmin: -1,
    zmax: 1
  };

  const handleFeatureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFeature(event.target.value as keyof Song);
  };

  return (
    <div>
      <label htmlFor="feature-select">Choose a feature to analyze: </label>
      <select id="feature-select" value={selectedFeature} onChange={handleFeatureChange}>
        {quantitativeColumns.map(feature => (
          <option key={feature} value={feature}>
            {feature}
          </option>
        ))}
      </select>

      <Plot
        data={[heatmapData]}
        layout={{
          title: `Correlation Heatmap for ${selectedArtist}`,
          xaxis: {
            title: 'Albums'
          },
          yaxis: {
            title: `Correlation with ${selectedFeature}`
          }
        }}
      />
    </div>
  );
};

export default CorrelationHeatmap;
