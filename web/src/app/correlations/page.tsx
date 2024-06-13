'use server'

import styles from './page.module.css'
import { getArtistsSongs } from '@/utils/artists-data'
import ArtistSelector from './selector'

export default async function ReleaseDatePage() {
  const songs = await getArtistsSongs()

  return (
    <main className={styles.main}>
      <ArtistSelector data={songs} />
    </main>
  )
}
