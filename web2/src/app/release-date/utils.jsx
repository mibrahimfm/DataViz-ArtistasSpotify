// lib/analyzeReleases.ts

const analyzeReleasesByMonth = (songs) => {
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
  const monthData = {};

  songs.forEach((song) => {
    const releaseDate = new Date(song.release_date);
    const month = releaseDate.getMonth();
    if (!monthData[month]) {
      monthData[month] = { popularitySum: 0, count: 0 };
    }
    monthData[month].popularitySum += song.popularity;
    monthData[month].count += 1;
  });

  const monthAnalysis = Object.entries(monthData).map(([month, data]) => ({
    month: monthNames[parseInt(month, 10)],
    averagePopularity: data.popularitySum / data.count,
    totalReleases: data.count,
  }));

  return monthAnalysis;
};

export default analyzeReleasesByMonth;
