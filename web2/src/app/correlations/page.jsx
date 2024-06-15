import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArtistsSongs } from "@/utils/artists-data";
import ArtistSelector from "./selector";

export default async function ReleaseDatePage() {
  const songs = await getArtistsSongs();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Correlação entre Métrica e Popularidade por Artista e Álbum
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ArtistSelector data={songs} />
      </CardContent>
    </Card>
  );
}
