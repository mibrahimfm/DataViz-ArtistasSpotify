import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArtistsSongs } from "@/utils/artists-data";
import PopularityChart from "./PopularityChart";

export default async function MetricsOverTimePage() {
  const songs = await getArtistsSongs();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popularidade por Duração da Música</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap justify-center">
        <PopularityChart data={songs} />
      </CardContent>
    </Card>
  );
}
