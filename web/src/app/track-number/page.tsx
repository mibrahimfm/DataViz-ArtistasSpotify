import { getArtistsSongs } from '@/utils/artists-data'
import ScatterPlot from './scatterplot'
import BoxPlot from './boxplot'
import CorrelationBarPlot from './correlation'

export default async function ReleaseDatePage() {
  const songs = await getArtistsSongs()

  return (
    <main>
      <ScatterPlot data={songs}/>
      <BoxPlot data={songs} />
      <CorrelationBarPlot data={songs} />
    </main>
  )
}
