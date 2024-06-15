"use client";

import Plot from "@/components/Plot";
import { capitalize } from "@/utils/capitalize";

const ScatterPlot = ({ data }) => {
  const artistNames = Object.keys(data);
  const plotData = artistNames.map((artist) => {
    return {
      x: data[artist].map((song) => song.track_number),
      y: data[artist].map((song) => song.popularity),
      mode: "markers",
      type: "scatter",
      name: capitalize(artist.replace("_", " ")),
    };
  });

  return (
    <Plot
      data={plotData}
      layout={{
        title: "Popularidade vs. Número da Faixa, Agrupado por Artista",
        xaxis: { title: "Número da Faixa" },
        yaxis: { title: "Popularidade" },
      }}
    />
  );
};

export default ScatterPlot;
