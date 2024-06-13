export type Song = {
  name: string
  album: string
  release_date: string
  popularity: number,
  track_number: number,
  acousticness: number,
  danceability: number,
  energy: number,
  instrumentalness: number,
  liveness: number,
  loudness: number,
  speechiness: number,
  tempo: number,
  valence: number,
  duration_ms: number
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
