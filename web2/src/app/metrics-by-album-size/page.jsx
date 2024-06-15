import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArtistsSongs } from "@/utils/artists-data";
import LineChart from "./lineChart";
import styles from "./page.module.css";

export default async function MetricsOverTimePage() {
  const songs = await getArtistsSongs();

  return (
    <Card className={styles.main}>
      <CardHeader>
        <CardTitle>Teste</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart data={songs} />
      </CardContent>
    </Card>
  );
}
