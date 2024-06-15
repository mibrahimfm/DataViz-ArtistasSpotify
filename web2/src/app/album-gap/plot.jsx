"use client";

import Plot from "@/components/Plot";

const PlotComponent = ({ data }) => {
  // Transform the data
  const processData = (data) => {
    const allData = [];

    Object.keys(data).forEach((artist) => {
      const songs = data[artist];
      const yearlyData = {};

      songs.forEach((song) => {
        const year = new Date(song.release_date).getFullYear().toString();

        if (!yearlyData[year]) {
          yearlyData[year] = { maxPopularity: song.popularity, releases: 1 };
        } else {
          yearlyData[year].maxPopularity = Math.max(
            yearlyData[year].maxPopularity,
            song.popularity
          );
          yearlyData[year].releases += 1;
        }
      });

      Object.keys(yearlyData).forEach((year) => {
        allData.push({
          artist,
          year,
          maxPopularity: yearlyData[year].maxPopularity,
          releases: yearlyData[year].releases,
        });
      });
    });

    return allData;
  };

  const processedData = processData(data);

  // Plot data
  const lineChartData = {
    x: processedData.map((d) => d.year),
    y: processedData.map((d) => d.maxPopularity),
    type: "scatter",
    mode: "lines+markers",
    name: "Popularidade Máxima",
    marker: { color: "blue" },
  };

  const barChartData = {
    x: processedData.map((d) => d.year),
    y: processedData.map((d) => d.releases),
    type: "bar",
    name: "Lançamentos",
    marker: { color: "orange" },
  };

  return (
    <Plot
      data={[lineChartData, barChartData]}
      layout={{
        title: "Popularidade Máxima e Lançamentos por Ano para cada Artista",
        barmode: "group",
        xaxis: { title: "Ano", tickangle: -45 },
        yaxis: { title: "Popularidade/Lançamentos" },
        showlegend: true,
        legend: { x: 1, xanchor: "right", y: 1 },
      }}
    />
  );
};

export default PlotComponent;
