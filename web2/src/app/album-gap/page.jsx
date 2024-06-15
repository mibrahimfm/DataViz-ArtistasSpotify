import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArtistsSongs } from "@/utils/artists-data";
import AveragePopularityLinePlot from "./line";
import PlotComponent from "./plot";

export default async function ReleaseDatePage() {
  const songs = await getArtistsSongs();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Lançamento de Álbuns</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center">
        <AveragePopularityLinePlot data={songs} />
        <PlotComponent data={songs} />
      </CardContent>
    </Card>
  );
}
