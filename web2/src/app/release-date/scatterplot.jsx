// components/ScatterPlot.tsx
"use client";

import Plot from "@/components/Plot";
import { capitalize } from "@/utils/capitalize";

const ScatterPlot = ({ data }) => {
  const monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const artistNames = Object.keys(data);

  const scatterData = artistNames.map((artist) => {
    const monthData = new Array(12)
      .fill(null)
      .map(() => ({ popularity: 0, count: 0 }));

    data[artist].forEach((song) => {
      const releaseDate = new Date(song.release_date);
      const month = releaseDate.getMonth();
      monthData[month].popularity += song.popularity;
      monthData[month].count += 1;
    });

    return {
      name: capitalize(artist.replace("_", " ")),
      x: monthNames,
      y: monthData.map((data) =>
        data.count > 0 ? data.popularity / data.count : 0
      ),
      mode: "lines+markers",
      type: "scatter",
      text: monthData.map(
        (data, monthIndex) =>
          `Artist: ${capitalize(artist.replace("_", " "))}<br>Month: ${
            monthNames[monthIndex]
          }<br>Avg Popularity: ${
            data.count > 0 ? (data.popularity / data.count).toFixed(2) : 0
          }`
      ),
      hoverinfo: "text",
    };
  });

  return (
    <div>
      <Plot
        // @ts-ignore
        data={scatterData}
        layout={{
          title:
            "Correlação entre popularidade e mês de lançamento das músicas por artista",
          xaxis: {
            title: "Mês",
          },
          yaxis: {
            title: "Popularidade Média",
          },
          plot_bgcolor: "rgba(0, 0, 0, 0)",
          paper_bgcolor: "rgba(0, 0, 0, 0)",
          showlegend: true, // Include a legend
        }}
      />
    </div>
  );
};

export default ScatterPlot;
