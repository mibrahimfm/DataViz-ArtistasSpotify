import Plot from "@/components/Plot";
import { capitalize } from "@/utils/capitalize";
import { useEffect, useState } from "react";

const parseAlbumName = (album) =>
  album.length > 15 ? album.slice(0, 15) + "..." : album;

const quantitativeColumns = [
  "track_number",
  "acousticness",
  "danceability",
  "energy",
  "instrumentalness",
  "liveness",
  "loudness",
  "speechiness",
  "tempo",
  "valence",
  "duration_ms",
  "popularity",
];

const getCorrelationMatrixByAlbum = (songs, targetFeature) => {
  const correlationMatrix = [];

  const albumsSet = new Set(songs.map((song) => song.album));
  albumsSet.forEach((album) => {
    const albumSongs = songs.filter((song) => song.album === album);
    quantitativeColumns.forEach((feature) => {
      if (feature !== targetFeature) {
        const correlation = calculateCorrelation(
          albumSongs,
          feature,
          targetFeature
        );
        correlationMatrix.push({
          album: album,
          feature: feature,
          correlation: correlation,
        });
      }
    });
  });

  return correlationMatrix;
};

const calculateCorrelation = (songs, col1, col2) => {
  const values1 = songs.map((song) => song[col1]);
  const values2 = songs.map((song) => song[col2]);

  const mean1 = values1.reduce((a, b) => a + b) / values1.length;
  const mean2 = values2.reduce((a, b) => a + b) / values2.length;

  const numerator = values1.reduce(
    (acc, val, idx) => acc + (val - mean1) * (values2[idx] - mean2),
    0
  );
  const denominator = Math.sqrt(
    values1.reduce((acc, val) => acc + Math.pow(val - mean1, 2), 0) *
      values2.reduce((acc, val) => acc + Math.pow(val - mean2, 2), 0)
  );

  return numerator / denominator;
};

const CorrelationHeatmap = ({ data, selectedArtist }) => {
  const [correlationMatrix, setCorrelationMatrix] = useState([]);
  const [targetFeature, setTargetFeature] = useState("popularity");

  useEffect(() => {
    if (selectedArtist && data[selectedArtist]) {
      const songs = data[selectedArtist];
      const correlationData = getCorrelationMatrixByAlbum(songs, targetFeature);
      setCorrelationMatrix(correlationData);
    }
  }, [data, selectedArtist, targetFeature]);

  const albums = Array.from(
    new Set(correlationMatrix.map((data) => data.album))
  );
  const features = quantitativeColumns.filter(
    (feature) => feature !== targetFeature
  );

  return (
    <div>
      <label htmlFor="target-feature-select">
        Selecione a métrica a ser correlacionada:{" "}
      </label>
      <select
        id="target-feature-select"
        value={targetFeature}
        onChange={(e) => setTargetFeature(e.target.value)}
      >
        {quantitativeColumns.map((feature) => (
          <option key={feature} value={feature}>
            {capitalize(feature, true)}
          </option>
        ))}
      </select>

      <Plot
        data={[
          {
            x: albums.map(parseAlbumName),
            y: features.map((feature) => capitalize(feature, true)),
            z: features.map((feature) => {
              return albums.map((album) => {
                const correlationData = correlationMatrix.find(
                  (data) => data.album === album && data.feature === feature
                );
                return correlationData ? correlationData.correlation : 0;
              });
            }),
            type: "heatmap",
            colorscale: "coolwarm",
            zmin: -1,
            zmax: 1,
            colorbar: {
              title: `Correlação com ${capitalize(targetFeature, true)}`,
              titleside: "right",
            },
          },
        ]}
        layout={{
          title: `Heatmap de correlação: ${capitalize(selectedArtist, true)}`,
          height: 600,
          width: 800,
          xaxis: {
            title: {
              text: "Álbuns",
              standoff: 20,
            },
            tickangle: -45, // Inclinar os rótulos para melhor legibilidade
          },
          yaxis: {
            title: {
              text: "Métricas",
              standoff: 20,
            },
            automargin: true,
          },
          plot_bgcolor: "rgba(0, 0, 0, 0)",
          paper_bgcolor: "rgba(0, 0, 0, 0)",
          margin: {
            l: 100, // Ajuste a margem esquerda para acomodar os rótulos do eixo y
            r: 20,
            t: 60, // Ajuste a margem superior para o título
            b: 120, // Ajuste a margem inferior para acomodar os rótulos do eixo x
          },
        }}
      />
    </div>
  );
};

export default CorrelationHeatmap;
