import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import artistData from "../data/western.json"; 
import styles from "../pages/WesternDetail.module.css"


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
      <h1>{artist.name}</h1>
      <img src={artist.profilePic} alt={artist.name} />
      <p><strong>Country:</strong> {artist.homeCountry}</p>
      <p><strong>Quote:</strong> {artist.quote}</p>
      <p><strong>Born:</strong> {artist.bornYear}</p>
      <p><strong>Died:</strong> {artist.diedYear}</p>
      <h2>{artist.influencesFromJapan}</h2>
      <h3>Artworks:</h3>
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
