import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArtistsSongs } from "@/utils/artists-data";
import Heatmap from "./heatmap";
import ScatterPlot from "./scatterplot";

export default async function ReleaseDatePage() {
  const songs = await getArtistsSongs();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analise de Data de Lançamento das Músicas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center">
        <Heatmap data={songs} />
        <ScatterPlot data={songs} />
      </CardContent>
    </Card>
  );
}
