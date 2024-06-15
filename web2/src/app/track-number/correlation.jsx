"use client";

import Plot from "@/components/Plot";
import { capitalize } from "@/utils/capitalize";

const CorrelationBarPlot = ({ data }) => {
  const calculateCorrelation = (songs) => {
    const x = songs.map((song) => song.track_number);
    const y = songs.map((song) => song.popularity);
    const sumX = x.reduce((acc, val) => acc + val, 0);
    const sumY = y.reduce((acc, val) => acc + val, 0);
    const avgX = sumX / x.length;
    const avgY = sumY / y.length;
    const numerator = x.reduce(
      (acc, val, idx) => acc + (val - avgX) * (y[idx] - avgY),
      0
    );
    const denominatorX = Math.sqrt(
      x.reduce((acc, val) => acc + (val - avgX) ** 2, 0)
    );
    const denominatorY = Math.sqrt(
      y.reduce((acc, val) => acc + (val - avgY) ** 2, 0)
    );
    return numerator / (denominatorX * denominatorY);
  };

  const correlations = Object.keys(data).map((artist) => {
    const songs = data[artist];
    return {
      artist,
      correlation: calculateCorrelation(songs),
    };
  });

  const plotData = {
    x: correlations.map((item) => capitalize(item.artist, true)),
    y: correlations.map((item) => item.correlation),
    type: "bar",
  };

  return (
    <Plot
      data={[plotData]}
      layout={{
        title: "Correlação entre Número da Faixa e Popularidade por Artista",
        xaxis: {
          title: {
            text: "Artista",
            standoff: 20, // Adjust this value to control the distance of the title from the axis labels
          },
          tickangle: -45,
          tickmode: "array",
          tickvals: correlations.map((item) => capitalize(item.artist, true)),
        },
        yaxis: { title: "Correlação", range: [-1, 1] },
        margin: { b: 100 }, // Increase the bottom margin to make room for the tilted labels
      }}
    />
  );
};

export default CorrelationBarPlot;
