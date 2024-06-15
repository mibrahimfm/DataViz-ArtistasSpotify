import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex gap-4 min-h-screen flex-col items-center ">
      <Card className="min-w-full">
        <CardHeader>
          <CardTitle>Integrantes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {/* <h1 className="font-bold text-lg -ml-4">Integrantes</h1> */}
          <ul className="">
            <li>Altino Alves Junior</li>
            <li>Aylton Bernardino de Almeida Junior</li>
            <li>Helena Muniz Nogueira</li>
            <li>Ian Guelman</li>
            <li>João Gabriel de Oliveira Bicalho</li>
            <li>Matheus Ibrahim Fonseca Magalhães</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Motivação</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p>
            Nos últimos anos, a expansão da economia digital e a introdução dos
            serviços de streaming, como o Spotify, têm redefinido hábitos de
            consumo e remodelado indústrias. Este projeto visa analisar um
            conjunto de dados multifacetados sobre artistas e suas músicas
            disponíveis na plataforma.
          </p>

          <p>
            Ao explorar características como energia, popularidade, e padrões de
            lançamento, buscamos descobrir tendências e dispersões que garantam
            visualizações de dados eficazes e informativas. O objetivo é
            entender como fatores intrínsecos e extrínsecos influenciam o
            sucesso de um artista ao longo de sua carreira.
          </p>

          <p>
            A escolha de uma base de dados baseado em artistas, bandas e suas músicas
            do Spotify se deve à intersecção entre música e tecnologia. A música
            é um fenômeno cultural complexo e universal, presente na vida humana
            há milênios, enquanto o Spotify, a maior plataforma de streaming,
            oferece dados valiosos sobre preferências musicais e comportamentos
            dos ouvintes.
          </p>

          <p>
            Analisar artistas de diferentes épocas, como Ed Sheeran, Taylor
            Swift, Beatles e Rolling Stones, permite explorar o que leva uma
            canção à popularidade e identificar padrões recorrentes em
            diferentes eras. A visualização desses dados torna as informações
            mais acessíveis e interpretações mais intuitivas, revelando padrões
            e correlações entre artistas e músicas.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
