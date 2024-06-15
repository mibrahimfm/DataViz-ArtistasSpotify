// components/Heatmap.tsx
"use client";

import Plot from "@/components/Plot";
import { capitalize } from "@/utils/capitalize";

const createHeatmapData = (data) => {
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
  const monthCounts = artistNames.map(() => new Array(12).fill(0));
  const monthPopularity = artistNames.map(() => new Array(12).fill(0));

  artistNames.forEach((artist, artistIndex) => {
    data[artist].forEach((song) => {
      const releaseDate = new Date(song.release_date);
      const month = releaseDate.getMonth();
      monthCounts[artistIndex][month]++;
      monthPopularity[artistIndex][month] += song.popularity;
    });
  });

  // Calculate percentages
  const percentages = monthCounts.map((counts, artistIndex) => {
    const totalReleases = counts.reduce((sum, count) => sum + count, 0);
    return counts.map((count) =>
      totalReleases > 0 ? (count / totalReleases) * 100 : 0
    );
  });

  const z = percentages;
  const x = monthNames;
  const y = artistNames.map((artist) => capitalize(artist.replace("_", " ")));

  const hoverText = monthCounts.map((row, artistIndex) =>
    row.map((count, monthIndex) => {
      const avgPopularity =
        count > 0
          ? (monthPopularity[artistIndex][monthIndex] / count).toFixed(2)
          : 0;
      const percentage = z[artistIndex][monthIndex].toFixed(2);
      return `Artist: ${capitalize(
        artistNames[artistIndex].replace("_", " ")
      )}<br>Month: ${
        monthNames[monthIndex]
      }<br>Releases: ${count}<br>Avg Popularity: ${avgPopularity}<br>Percentage: ${percentage}%`;
    })
  );

  return { z, x, y, hoverText };
};

const Heatmap = ({ data }) => {
  const heatmapData = createHeatmapData(data);

  return (
    <div>
      <Plot
        data={[
          {
            z: heatmapData.z,
            x: heatmapData.x,
            y: heatmapData.y,
            type: "heatmap",
            colorscale: "YlGnBu",
            text: heatmapData.hoverText,
            hoverinfo: "text", // Add this line to ensure hover text is used
            hovertemplate: "%{text}<extra></extra>",
            colorbar: {
              title: "Popularidade Média (%)",
              titleside: "right",
            },
          },
        ]}
        layout={{
          title: {
            text: "Frequência de Lançamento por Mês e Artista",
            x: 0.5,
            xanchor: "center",
          },
          xaxis: {
            title: "Mês",
          },
          yaxis: {
            title: {
              text: "Artista",
              standoff: 20, // Increase this value to create more space
            },
          },
          plot_bgcolor: "rgba(0, 0, 0, 0)",
          paper_bgcolor: "rgba(0, 0, 0, 0)",
          margin: {
            l: 120, // Increase the left margin to accommodate artist names
            r: 20,
            t: 60,
            b: 40,
          },
        }}
      />
    </div>
  );
};

export default Heatmap;
