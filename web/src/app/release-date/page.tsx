import styles from './page.module.css'
import { getArtistsSongs } from '@/utils/artists-data'
import ScatterPlot from './scatterplot'
import Heatmap from './heatmap'

export default async function ReleaseDatePage() {
  const songs = await getArtistsSongs()

  return (
    <main className={styles.main}>
      <Heatmap data={songs} />
      <ScatterPlot data={songs} />
    </main>
  )
}
