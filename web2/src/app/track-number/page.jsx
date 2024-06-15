import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArtistsSongs } from "@/utils/artists-data";
import BoxPlot from "./boxplot";
import CorrelationBarPlot from "./correlation";
import ScatterPlot from "./scatterplot";

export default async function ReleaseDatePage() {
  const songs = await getArtistsSongs();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise da Popularidade por Número da Faixa</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center">
        <ScatterPlot data={songs} />
        <BoxPlot data={songs} />
        <CorrelationBarPlot data={songs} />
      </CardContent>
    </Card>
  );
}
