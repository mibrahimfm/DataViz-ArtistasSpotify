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

const getCorrelationMatrixByAlbum = (songs: Song[]): CorrelationData[] => {
  const quantitativeColumns: (keyof Song)[] = ['track_number', 'acousticness', 'danceability', 'energy', 'instrumentalness',
    'liveness', 'loudness', 'speechiness', 'tempo', 'valence', 'duration_ms'];

  // Initialize correlation matrix
  const correlationMatrix: CorrelationData[] = [];

  // Iterate over each album
  const albumsSet = new Set(songs.map(song => song.album));
  albumsSet.forEach(album => {
    // Filter songs for the current album
    const albumSongs = songs.filter(song => song.album === album);
    // Calculate correlations for each feature in relation to 'popularity'
    quantitativeColumns.forEach(feature => {
      if (feature !== 'popularity') {
        const correlation = calculateCorrelation(albumSongs, feature, 'popularity');
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

  useEffect(() => {
    if (selectedArtist && data[selectedArtist]) {
      const songs = data[selectedArtist];
      const correlationData = getCorrelationMatrixByAlbum(songs);
      setCorrelationMatrix(correlationData);
    }
  }, [data, selectedArtist]);

  const albums = Array.from(new Set(correlationMatrix.map(data => data.album)));
  const features = Array.from(new Set(correlationMatrix.map(data => data.feature)));

  return (
    <Plot
      data={[
        {
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
        }
      ]}
      layout={{
        title: `Correlation Heatmap for ${selectedArtist}`,
        xaxis: {
          title: 'Albums'
        },
        yaxis: {
          title: 'Features'
        }
      }}
    />
  );
};

export default CorrelationHeatmap;
