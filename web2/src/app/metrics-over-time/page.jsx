import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArtistsSongs } from "@/utils/artists-data";
import LineChart from "./lineChart";

export default async function MetricsOverTimePage() {
  const songs = await getArtistsSongs();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teste</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart data={songs} />
      </CardContent>
    </Card>
  );
}
