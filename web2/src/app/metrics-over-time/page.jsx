import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArtistsSongs } from "@/utils/artists-data";
import LineChart from "./lineChart";

export default async function MetricsOverTimePage() {
  const songs = await getArtistsSongs();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas por Artista ao Longo dos Anos</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center">
        <LineChart data={songs} />
      </CardContent>
    </Card>
  );
}
