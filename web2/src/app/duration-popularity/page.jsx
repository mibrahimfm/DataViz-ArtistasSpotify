import { getArtistsSongs } from '@/utils/artists-data';
import PopularityChart from './PopularityChart';
import styles from './page.module.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function MetricsOverTimePage() {
  const songs = await getArtistsSongs();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popularidade por duração</CardTitle>
      </CardHeader>
      <CardContent>
        <PopularityChart data={songs} />
      </CardContent>
    </Card>
  );
}
