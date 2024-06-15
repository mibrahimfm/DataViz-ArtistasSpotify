'use client'

import Plot from '@/components/Plot'
import { ArtistsData, Song } from '@/types'
import { capitalize } from '@/utils/capitalize'
import { orange } from '@mui/material/colors'
import { Data } from 'plotly.js'
import { useState } from 'react'
import styles from './page.module.css'

interface ChartProps {
  data: ArtistsData
}

function getSelected(select) {
  const result = []
  const options = select && select.options

  for (let i = 0, iLen = options.length; i < iLen; i++) {
    const opt = options[i]
    if (opt.selected) {
      result.push(opt.value)
    }
  }
  return result
}

function mediana(arr: number[]) {
  if (arr.length === 0) return 0

  const copia = arr.slice()
  copia.sort()
  const mid = Math.floor(copia.length / 2)

  if (copia.length % 2 === 0) {
    // Se o número de elementos é par, a mediana é a média dos dois elementos centrais
    return (copia[mid - 1] + copia[mid]) / 2
  } else {
    // Se o número de elementos é ímpar, a mediana é o elemento central
    return copia[mid]
  }
}

function toMinute(ms: number) {
  const mi = Math.floor(ms / 60000)
  const se = String((ms - mi * 60000) / 1000).padStart(2, '0')
  return mi + ':' + se
}

export default function PopularityChart({ data }: ChartProps) {
  const artistas = Object.keys(data) as (keyof ArtistsData)[]
  const [selectedArtists, setSelectedArtists] = useState(artistas)
  const [multiple, setMultiple] = useState(false)

  let dataSets = selectedArtists.map((a) => data[a])
  if (!multiple) dataSets = [[].concat(...dataSets)]

  const charts = dataSets.map((set, i) => {
    const b = set.filter((s) => s.duration_ms < 60000)
    const t = set.filter((s) => s.duration_ms > 9 * 60000)

    const bp = mediana(b.map((i) => i.popularity))
    const tp = mediana(t.map((i) => i.popularity))

    let rangeStartIndex = 0
    let rangeEndMs = 80000
    const groups: { start: number; end: number; data: Song[] }[] = [] // mg
    const m = set
      .filter((s) => s.duration_ms >= 60000 && s.duration_ms <= 9 * 60000)
      .sort((a, b) => a.duration_ms - b.duration_ms)

    m.forEach((s, i) => {
      if (s.duration_ms > rangeEndMs) {
        groups.push({
          start: rangeEndMs - 20000,
          end: rangeEndMs,
          data: m.slice(rangeStartIndex, i)
        })
        rangeEndMs += 20000
        rangeStartIndex = i
      }
    })
    groups.push({
      start: rangeEndMs - 20000,
      end: rangeEndMs,
      data: m.slice(rangeStartIndex)
    })

    const mp = groups.map((g) => mediana(g.data.map((s) => s.popularity)))

    const X = [60000, ...groups.map((g) => g.end), 560000]
    const Y = [bp, ...mp, tp]
    const C = [b.length, ...groups.map((g) => g.data.length), t.length]

    return {
      artist: multiple ? selectedArtists[i] : '*',
      data: [
        {
          x: X,
          y: C,
          type: 'bar',
          name: 'Quantidade',
          yaxis: 'y1', // Eixo direito
          opacity: 0.35,
          marker: { color: orange[500] }
        },
        {
          x: X,
          y: Y,
          type: 'scatter',
          mode: 'markers',
          marker: { color: 'blue' },
          name: 'Popularidade',
          yaxis: 'y2' // Eixo esquerdo
        }
      ] as Data[],
      ticks: {
        X,
        T: X.map((v, i) =>
          i === 0 ? '< 1:00' : i === X.length - 1 ? '> 9:00' : toMinute(v)
        )
      }
    }
  })

  return (
    <article className={styles.article}>
      <div className={styles.select}>
        <label htmlFor="ssss">Selecione os artistas:</label>
        <select
          id="ssss"
          value={selectedArtists}
          multiple
          onChange={(e) => setSelectedArtists(getSelected(e.target))}
        >
          {artistas.map((a) => (
            <option key={a} value={a}>
              {capitalize(a, true)}
            </option>
          ))}
        </select>
      </div>
      <label>
        <input
          type="checkbox"
          checked={multiple}
          onChange={(e) => setMultiple(e.target.checked)}
        />{' '}
        Plotar gráficos individualmente
      </label>

      <div className="multiple">
        {selectedArtists.length === 0 ? (
          <p style={{ marginTop: '3em' }}>Selecione pelo menos um artista.</p>
        ) : (
          charts.map((chart) => (
            <Plot
              key={chart.artist}
              data={chart.data}
              layout={{
                title:
                  'Popularidade das músicas por duração' +
                  (chart.artist !== '*'
                    ? ` - ${capitalize(chart.artist, true)}`
                    : ''),
                yaxis: {
                  title: 'Quantidade de músicas',
                  side: 'left',
                  showgrid: false
                },
                yaxis2: {
                  title: 'Mediana da popularidade (%)',
                  side: 'right',
                  overlaying: 'y'
                },
                xaxis: {
                  title: 'Duração em minutos',
                  tickvals: chart.ticks.X,
                  ticktext: chart.ticks.T
                }
              }}
            />
          ))
        )}
      </div>
    </article>
  )
}
