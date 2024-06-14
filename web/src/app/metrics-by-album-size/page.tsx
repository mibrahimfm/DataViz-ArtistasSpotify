import styles from './page.module.css'
import { getArtistsSongs } from '@/utils/artists-data'
import LineChart from './lineChart'

export default async function MetricsOverTimePage() {
  const songs = await getArtistsSongs()

  return (
    <main className={styles.main}>
      <LineChart data={songs}/>
    </main>
  )
}
