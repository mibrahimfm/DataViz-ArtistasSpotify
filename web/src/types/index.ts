export type Song = {
  name: string
  album: string
  release_date: string
  popularity: number
}

export type ArtistsData = {
  beatles: Song[]
  ed_sheeran: Song[]
  elton_john: Song[]
  metallica: Song[]
  rolling_stones: Song[]
  tame_impala: Song[]
  taylor_swift: Song[]
}
