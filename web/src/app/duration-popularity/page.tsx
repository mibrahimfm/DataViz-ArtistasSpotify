import { getArtistsSongs } from '@/utils/artists-data'
import PopularityChart from './PopularityChart'
import styles from './page.module.css'


export default async function MetricsOverTimePage() {
  const songs = await getArtistsSongs()

  return (
    <main className={styles.main}>
      <PopularityChart data={songs} />
    </main>
  )
}
