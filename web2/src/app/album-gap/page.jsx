import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getArtistsSongs } from "@/utils/artists-data";
import AveragePopularityLinePlot from "./line";
import PlotComponent from "./plot";

export default async function ReleaseDatePage() {
  const songs = await getArtistsSongs();

  return (
    <Card>
      <CardHeader>Teste</CardHeader>
      <CardContent>
        <AveragePopularityLinePlot data={songs} />
        <PlotComponent data={songs} />
      </CardContent>
    </Card>
  );
}
