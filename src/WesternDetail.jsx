import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import artistData from "./data/western.json"; // western.jsonをインポート


const WesternDetail = () => {
  const { id } = useParams(); // URLパラメータからidを取得
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    // IDに基づいて対応するアーティストデータを取得
    const selectedArtist = artistData.westernArtists[id];
    setArtist(selectedArtist); // artist stateにセット
  }, [id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={artist.profilePic} alt={artist.name} />
      <h1>{artist.name}</h1>
      <p><strong>Quote:</strong> {artist.quote}</p>
      <p><strong>Country:</strong> {artist.homeCountry}</p>
      <p><strong>Born:</strong> {artist.bornYear}</p>
      <p><strong>Died:</strong> {artist.diedYear}</p>
      <h4>Artworks:</h4>
      <ul>
        {artist.artworks.map((art, index) => (
          <li key={index}>
            <img src={art.url} alt={art.title} />
            <p>{art.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WesternDetail;
