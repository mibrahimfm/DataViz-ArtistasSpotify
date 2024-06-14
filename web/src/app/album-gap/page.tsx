'use server'

import { getArtistsSongs } from '@/utils/artists-data'
import AveragePopularityLinePlot from './line'
import PlotComponent from './plot'

export default async function ReleaseDatePage() {
  const songs = await getArtistsSongs()

  return (
    <main>
      <AveragePopularityLinePlot data={songs} />
      <PlotComponent data={songs} />
    </main>
  )
}
