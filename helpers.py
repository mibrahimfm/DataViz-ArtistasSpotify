import pandas as pd

def load_aggregated_data_set(base_path):
    beatles_df = pd.DataFrame(pd.read_csv(base_path + "/beatles_spotify.csv", sep=','))
    beatles_df["artist"] = "The Beatles"

    ed_sheeran_df = pd.DataFrame(pd.read_csv(base_path + "/ed_sheeran_spotify.csv", sep=','))
    ed_sheeran_df["artist"] = "Ed Sheeran"

    elton_john_df = pd.DataFrame(pd.read_csv(base_path + "/elton_john_spotify.csv", sep=','))
    elton_john_df["artist"] = "Elton John"

    metallica_df = pd.DataFrame(pd.read_csv(base_path + "/metallica_spotify.csv", sep=','))
    metallica_df["artist"] = "Metallica"

    rolling_stones_df = pd.DataFrame(pd.read_csv(base_path + "/rolling_stones_spotify.csv", sep=','))
    rolling_stones_df["artist"] = "Rolling Stones"

    tame_impala_df = pd.DataFrame(pd.read_csv(base_path + "/tame_impala_spotify.csv", sep=','))
    tame_impala_df["artist"] = "Tame Impala"

    taylor_swift_df = pd.DataFrame(pd.read_csv(base_path + "/taylor_swift_spotify.csv", sep=','))
    taylor_swift_df["artist"] = "Taylor Swift"

    artists_df = pd.concat([beatles_df, ed_sheeran_df, elton_john_df, metallica_df, rolling_stones_df, tame_impala_df, taylor_swift_df])

    artists_df = pd.merge(artists_df, artists_df.groupby(['artist', 'album']).size().reset_index(name='album_size'), on=['artist', 'album'])

    return artists_df
