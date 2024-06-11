import { Song } from '@/types'
import { promises as fs } from 'fs'

type ArtistsData = {
  beatles: Song[]
  ed_sheeran: Song[]
  elton_john: Song[]
  metallica: Song[]
  rolling_stones: Song[]
  tame_impala: Song[]
  taylor_swift: Song[]
}

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
