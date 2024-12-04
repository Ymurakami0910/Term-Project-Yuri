import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import artistData from "../data/western.json"; // western.jsonのインポート
import styles from './Western.module.css'; // CSSモジュールのインポート

function Western() {
  const [artistsData, setArtistsData] = useState([]);

  useEffect(() => {
    setArtistsData(artistData.westernArtists);
  }, []);


  return (
    <div className={styles.container}>
      {/* Slick Slider */}
        {artistsData.map((artist, index) => (
          <div key={index} className={styles.card}>
            <Link to={`/artist/${index}`} className={styles.link}>
              <img src={artist.profilePic} alt={artist.name} className={styles.profilePic} />
              <h1 className={styles.artistName}>{artist.name}</h1>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Western;
