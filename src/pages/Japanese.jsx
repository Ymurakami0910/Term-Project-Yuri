import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gakaData from "../data/japanese.json"; // データインポート
import styles from "./Western.module.css"; // CSSモジュールのインポート

function Japanese() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    // データが存在する場合のみsetArtistsを実行
    if (gakaData && gakaData.japaneseArtists) {
      setArtists(gakaData.japaneseArtists);
    }
  }, []); // コンポーネントがマウントされたときに一度だけ実行


  return (
    <div className={styles.container}>
      {artists.map((artist, index) => (
        <div key={index} className={styles.card}>
          <Link to={`/gaka/${index}`} className={styles.link}>
            <img
              src={artist.profilePic}
              alt={artist.name}
              className={styles.profilePic}
            />
            <h1 className={styles.artistName}>{artist.name}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Japanese;
