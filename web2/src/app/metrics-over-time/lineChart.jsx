"use client";

import Plot from "@/components/Plot";
import { capitalize } from "@/utils/capitalize";
import { useState } from "react";
import styles from "./page.module.css";

const LineChart = ({ data }) => {
  const [metric, setMetric] = useState("popularity");

  const artistNames = Object.keys(data);

  const aggregateDataByYear = (artistData) => {
    const yearlyData = artistData.reduce((acc, song) => {
      const year = new Date(song.release_date).getFullYear();
      if (!acc[year]) {
        acc[year] = { total: 0, count: 0 };
      }
      acc[year].total += song[metric];
      acc[year].count += 1;
      return acc;
    }, {});

    return Object.keys(yearlyData).map((year) => ({
      year: parseInt(year),
      average: yearlyData[year].total / yearlyData[year].count,
    }));
  };

  const chartData = artistNames.map((artist) => {
    const aggregatedData = aggregateDataByYear(data[artist]);
    return {
      name: capitalize(artist.replace("_", " ")),
      x: aggregatedData.map((item) => item.year),
      y: aggregatedData.map((item) => item.average),
      mode: "lines+markers",
      hovertemplate: `<b>Artist:</b> ${capitalize(
        artist.replace("_", " ")
      )}<br><b>Year:</b> %{x}<br><b>${capitalize(
        metric
      )}:</b> %{y}<extra></extra>`,
    };
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
            {capitalize(metric)}
          </option>
        ))}
      </select>

      <div>
        <Plot
          data={chartData}
          layout={{
            title: `${capitalize(metric)} vs. Ano de lançamento por Artista`,
            xaxis: {
              title: "Ano",
              tickmode: "linear",
              tick0: Math.min(...chartData.flatMap((artist) => artist.x)),
              dtick: 3,
              tickangle: -45,
              automargin: true,
            },
            yaxis: {
              title: `${capitalize(metric)} (média)`,
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
