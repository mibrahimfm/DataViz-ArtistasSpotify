import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function MetricsOverTimePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dataset</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap">
        <p>
          A base de dados selecionada para o trabalho consiste em conjunto de
          dados da API do Spotify em todos os álbuns listados na plataforma de
          alguns dos destaques da música (sendo eles Taylor Swift, Ed Sheeran,
          Rolling Stones, the Beatles, Tame Impala, Elton John e Metallica). Os
          dados estão subdivididos em 7 datasets de mesmo formato
          (possibilitando a comparação entre as bases) disponíveis na plataforma
          Kaggle. Segue abaixo o link para acesso às bases:
        </p>

        <ul className="list-disc ml-8 mt-4">
          <li>
            <a
              className="text-blue-600 visited:text-purple-600 underline"
              href="https://www.kaggle.com/datasets/jarredpriester/taylor-swift-spotify-dataset"
              target="_blank"
            >
              Taylor Swift
            </a>
          </li>
          <li>
            <a
              className="text-blue-600 visited:text-purple-600 underline"
              href="https://www.kaggle.com/datasets/jarredpriester/ed-sheeran-spotify-dataset"
              target="_blank"
            >
              Ed Sheeran
            </a>
          </li>
          <li>
            <a
              className="text-blue-600 visited:text-purple-600 underline"
              href="https://www.kaggle.com/datasets/jarredpriester/rolling-stones-spotify-dataset"
              target="_blank"
            >
              Rolling Stones
            </a>
          </li>
          <li>
            <a
              className="text-blue-600 visited:text-purple-600 underline"
              href="https://www.kaggle.com/datasets/jarredpriester/the-beatles-spotify-dataset"
              target="_blank"
            >
              The Beatles
            </a>
          </li>
          <li>
            <a
              className="text-blue-600 visited:text-purple-600 underline"
              href="https://www.kaggle.com/datasets/jarredpriester/tame-impala-spotify-dataset"
              target="_blank"
            >
              Tame Impala
            </a>
          </li>
          <li>
            <a
              className="text-blue-600 visited:text-purple-600 underline"
              href="https://www.kaggle.com/datasets/jarredpriester/elton-john-spotify-dataset"
              target="_blank"
            >
              Elton John
            </a>
          </li>
          <li>
            <a
              className="text-blue-600 visited:text-purple-600 underline"
              href="https://www.kaggle.com/datasets/jarredpriester/metallica-spotify-dataset"
              target="_blank"
            >
              Metallica
            </a>
          </li>
        </ul>

        <div className="mt-8">
          <p className="mb-2">
            O conjunto de dados selecionado apresenta consigo as seguintes
            colunas:
          </p>

          <ul className="list-disc ml-8">
            <li>
              <strong>duration_ms</strong> – A duração da faixa em milissegundos;
            </li>
            <li>
              <strong>name</strong> - o nome da música;
            </li>
            <li>
              <strong>album</strong> - o nome do álbum;
            </li>
            <li>
              <strong>release_date</strong> - o dia, mês e ano em que o álbum
              foi lançado;
            </li>
            <li>
              <strong>track_number</strong> - a ordem em que a música aparece
              no álbum;
            </li>
            <li>
              <strong>id</strong> - o ID do Spotify para a música;
            </li>
            <li>
              <strong>uri</strong> - o uri do Spotify para a música;
            </li>
            <li>
              <strong>acousticness</strong> - Uma medida de confiança de 0,0 a 1,0
              para saber se a faixa é acústica. 1,0 representa alta confiança de
              que a faixa é acústica;
            </li>
            <li>
              <strong>danceability</strong> - A dançabilidade descreve o quão
              adequada uma faixa é para dançar com base em uma combinação de
              elementos musicais, incluindo andamento, estabilidade do ritmo,
              força da batida e regularidade geral. Um valor de 0,0 é menos
              dançante e 1,0 é mais dançante;
            </li>
            <li>
              <strong>energy</strong> - Energia é uma medida de 0,0 a 1,0 e
              representa uma medida perceptiva de intensidade e atividade.
              Normalmente, as faixas energéticas parecem rápidas, altas e
              barulhentas. Por exemplo, o death metal tem alta energia, enquanto
              um prelúdio de Bach tem pontuação baixa na escala. As
              características perceptivas que contribuem para este atributo
              incluem faixa dinâmica, volume percebido, timbre, taxa de início e
              entropia geral;
            </li>
            <li>
              <strong>instrumentalness</strong> - Prevê se uma faixa não contém
              vocais. Os sons "Ooh" e "aah" são tratados como instrumentais
              neste contexto. Faixas de rap ou palavras faladas são claramente
              "vocais". Quanto mais próximo o valor da instrumentalidade estiver
              de 1,0, maior será a probabilidade de a faixa não conter conteúdo
              vocal. Valores acima de 0,5 pretendem representar faixas
              instrumentais, mas a confiança é maior à medida que o valor se
              aproxima de 1,0;
            </li>
            <li>
              <strong>liveness</strong> - Detecta a presença de público na
              gravação. Valores mais altos de vivacidade representam uma
              probabilidade maior de que a faixa tenha sido tocada ao vivo. Um
              valor acima de 0,8 oferece forte probabilidade de que a pista
              esteja ativa;
            </li>
            <li>
              <strong>loudness</strong> - O volume geral de uma faixa em
              decibéis (dB). Os valores de intensidade são calculados em média
              em toda a faixa e são úteis para comparar a intensidade relativa
              das faixas. Loudness é a qualidade de um som que é o principal
              correlato psicológico da força física (amplitude). Os valores
              normalmente variam entre -60 e 0 db;
            </li>
            <li>
              <strong>speechiness</strong> - detecta a presença de palavras faladas
              em uma faixa. Quanto mais exclusivamente falada for a gravação
              (por exemplo, talk show, audiolivro, poesia), mais próximo de 1,0
              será o valor do atributo. Valores acima de 0,66 descrevem faixas
              que provavelmente são compostas inteiramente de palavras faladas.
              Valores entre 0,33 e 0,66 descrevem faixas que podem conter música
              e fala, seja em seções ou em camadas, incluindo casos como música
              rap. Valores abaixo de 0,33 provavelmente representam música e
              outras faixas não faladas;
            </li>
            <li>
              <strong>tempo</strong> - O andamento geral estimado de uma
              faixa em batidas por minuto (BPM). Na terminologia musical, o
              andamento é a velocidade ou andamento de uma determinada peça e
              deriva diretamente da duração média da batida;
            </li>
            <li>
              <strong>valence</strong> - Uma medida de 0,0 a 1,0 que descreve a
              positividade musical transmitida por uma faixa. Faixas com
              valência alta soam mais positivas (por exemplo, feliz, alegre,
              eufórica), enquanto faixas com valência baixa soam mais negativas
              (por exemplo, triste, deprimida, irritada);
            </li>
            <li>
              <strong>popularity</strong> - a popularidade da música de 0 a
              100.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
