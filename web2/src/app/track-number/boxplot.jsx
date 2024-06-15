"use client";

import Plot from "@/components/Plot";
import { capitalize } from "@/utils/capitalize";

const BoxPlot = ({ data }) => {
  const artistNames = Object.keys(data);
  const plotData = artistNames.map((artist) => {
    return {
      y: data[artist].map((song) => song.popularity),
      type: "box",
      name: capitalize(artist.replace("_", " ")),
    };
  });

  return (
    <Plot
      data={plotData}
      layout={{
        title: "Popularidade da Faixa por Artista",
        xaxis: {
          title: "Artista",
          tickangle: 45,
          tickmode: "array",
          tickvals: artistNames,
        },
        yaxis: {
          title: "Popularidade",
        },
      }}
    />
  );
};

export default BoxPlot;
