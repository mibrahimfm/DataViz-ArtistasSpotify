"use client";

import Plot from "@/components/Plot";
import { capitalize } from "@/utils/capitalize";
import { useState } from "react";
import styles from "./page.module.css";

const LineChart = ({ data }) => {
  const [metric, setMetric] = useState("popularity");

  const artistNames = Object.keys(data);

  const aggregateDataByAlbumSize = (artistData) => {
    const albumData = artistData.reduce((acc, song) => {
      const album = song.album;
      if (!acc[album]) {
        acc[album] = { total: 0, count: 0 };
      }
      acc[album].total += song[metric];
      acc[album].count += 1;
      return acc;
    }, {});

    return Object.keys(albumData).map((album) => ({
      album,
      average: albumData[album].total / albumData[album].count,
      size: albumData[album].count,
    }));
  };

  const calculateTrendline = (x, y) => {
    const n = x.length;
    const xSum = x.reduce((a, b) => a + b, 0);
    const ySum = y.reduce((a, b) => a + b, 0);
    const xySum = x.map((xi, i) => xi * y[i]).reduce((a, b) => a + b, 0);
    const xSquaredSum = x.map((xi) => xi * xi).reduce((a, b) => a + b, 0);

    const slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum * xSum);
    const intercept = (ySum - slope * xSum) / n;

    return x.map((xi) => slope * xi + intercept);
  };

  const colors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
  ];

  const chartData = artistNames.flatMap((artist, index) => {
    const aggregatedData = aggregateDataByAlbumSize(data[artist]);
    const sizes = aggregatedData.map((item) => item.size);
    const averages = aggregatedData.map((item) => item.average);
    const trendline = calculateTrendline(sizes, averages);
    const color = colors[index % colors.length];

    return [
      {
        name: `${capitalize(artist.replace("_", " "))} - Dados`,
        x: sizes,
        y: averages,
        mode: "markers",
        marker: { color },
        hovertemplate: `<b>Artist:</b> ${capitalize(
          artist.replace("_", " ")
        )}<br><b>Album Size:</b> %{x}<br><b>${capitalize(
          metric
        )}:</b> %{y}<extra></extra>`,
      },
      {
        name: `${capitalize(artist.replace("_", " "))} - Tendência`,
        x: sizes,
        y: trendline,
        mode: "lines",
        line: { color },
        hovertemplate: `<b>Artist:</b> ${capitalize(
          artist.replace("_", " ")
        )}<br><b>Album Size:</b> %{x}<br><b>${capitalize(
          metric
        )}:</b> %{y}<extra></extra>`,
      },
    ];
  });

  const metrics = [
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",
    "liveness",
    "loudness",
    "speechiness",
    "tempo",
    "valence",
    "popularity",
    "duration_ms",
  ];

  return (
    <div className="text-center">
      <label htmlFor="metric-select">Selecione a métrica</label>
      <select
        id="metric-select"
        value={metric}
        onChange={(e) => setMetric(e.target.value)}
        className={styles.select}
      >
        {metrics.map((metric) => (
          <option key={metric} value={metric}>
            {capitalize(metric, true)}
          </option>
        ))}
      </select>

      <div>
        <Plot
          data={chartData}
          layout={{
            title: `${capitalize(
              metric
            )} vs. Tamanho do Álbum para cada Artista`,
            height: 600,
            width: 800,
            xaxis: {
              title: "Tamanho do Álbum",
              tickmode: "linear",
              tick0: Math.min(...chartData.flatMap((artist) => artist.x)),
              dtick: 10,
              automargin: true,
            },
            yaxis: {
              title: `${capitalize(metric, true)} (média)`,
            },
            plot_bgcolor: "rgba(0, 0, 0, 0)",
            paper_bgcolor: "rgba(0, 0, 0, 0)",
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
