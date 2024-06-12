import { ArtistsData } from '@/types'
import { promises as fs } from 'fs'

const ARTISTS = [
  'beatles',
  'ed_sheeran',
  'elton_john',
  'metallica',
  'rolling_stones',
  'tame_impala',
  'taylor_swift'
]

export const getArtistsSongs = async (): Promise<ArtistsData> => {
  const response = await Promise.all(
    ARTISTS.map(async (artist) => [
      artist,
      JSON.parse(
        await fs.readFile(
          `${process.cwd()}/public/artists/${artist}_spotify.json`,
          'utf-8'
        )
      )
    ])
  )

  const artistsSongs: ArtistsData = Object.fromEntries(response)

  return artistsSongs
}
