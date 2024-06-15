"use client";

import { capitalize } from "@/utils/capitalize";
import { useState } from "react";
import CorrelationHeatmap from "./heatmap";

const ArtistSelector = ({ data }) => {
  const [selectedArtist, setSelectedArtist] = useState("beatles");

  const handleArtistChange = (event) => {
    setSelectedArtist(event.target.value);
  };

  return (
    <div className="text-center">
      <label htmlFor="artist-select">Escolha um Artista: </label>
      <select
        id="artist-select"
        value={selectedArtist}
        onChange={handleArtistChange}
      >
        {Object.keys(data).map((artist) => (
          <option key={artist} value={artist}>
            {capitalize(artist.replace("_", " "))}
          </option>
        ))}
      </select>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selectedArtist && (
          <CorrelationHeatmap data={data} selectedArtist={selectedArtist} />
        )}
      </div>
    </div>
  );
};

export default ArtistSelector;
