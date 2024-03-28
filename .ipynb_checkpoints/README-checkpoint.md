## Perguntas:
1: A posição da faixa no álbum afeta sua popularidade? Varia de artista para artista?  
2: Artistas têm curvas de sucesso similares (crescem, ficam estagnados, e caem lentamente, por exemplo)? - daria para usar um themeriver, por exemplo  
3: A época/estilo musical do artista afeta sua trajetória?  
4: Existem métricas que ajudam a identificar músicas mais populares dos artistas? (Talvez por estilo musical, na visão geral pode ser mais difícil) (MATHEUS)  
5: Existe algum padrão em datas de lançamento de álbum/singles? Isso afeta o sucesso? (AYLTON)  
6: Como as métricas da música de um artista mudam ao longo do tempo? (IAN)  
7: O tamanho do álbum faz alguma diferença? Muda de artista para artista? (IAN)  
8: Intervalo entre lançamento de álbuns faz alguma diferença?  
9: Artistas têm mais músicas ao vivo (liveness) em que período de suas carreiras?  
10: Estudo de sucesso por ano de cada artista (ver qual foi o máximo que cada artista chegou em cada ano, ver quantos lançamentos por ano cada artista faz )  
11: Estudo se o tempo de duração das músicas impactam no sucesso  e qual a média de duração das músicas de cada artista.  
  
## Explicação dataset
Cada csv possui toda a biblioteca de músicas de um artista no spotify, com as seguintes colunas:  
name - the name of the song  
album - the name of the album  
release_date - the day month and year the album was released  
track number - the order the song appears on the album  
id - the Spotify id for the song  

uri - the Spotify uri for the song  

acousticness - A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.  

danceability - Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat 

strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.  

energy - Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and 

noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.  

instrumentalness - Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.  

liveness - Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.  

loudness - The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks. Loudness is the quality of a sound that is the primary psychological correlate of physical strength (amplitude). Values typically range between -60 and 0 db.  

speechiness - detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 1.0 the attribute value. Values above 0.66 describe tracks that are probably made entirely of spoken words. Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 0.33 most likely represent music and other non-speech-like tracks.  

tempo - The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.  

valence - A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).  

popularity - the popularity of the song from 0 to 100  

duration_ms - The duration of the track in milliseconds.  