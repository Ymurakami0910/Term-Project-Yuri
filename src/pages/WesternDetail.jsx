import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import artistData from "../data/western.json";
import styles from "./WesternDetail.module.css";
import Header from "../components/header";



const WesternDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const selectedArtist = artistData.westernArtists[id];
    setArtist(selectedArtist);
  }, [id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  

  return (
    <>
    <Header/>
    <div className={`${styles.container} divider`}>
      <div className={styles.leftPanel}>
        <h1 className={styles.name}>{artist.name}</h1>
        <img
          src={artist.profilePic}
          alt={artist.name}
          className={styles.profilePic}
        />
      </div>
      <div className={styles.rightPanel}>
        <p>
          <strong>Country:</strong> {artist.homeCountry}
        </p>
        <p className={styles.quote}>
          <strong>Quote:</strong> {artist.quote}
        </p>
        <div className={styles.dates}>
          <p>
            <strong>Born:</strong> {artist.bornYear}
          </p>
          <p>
            <strong>Died:</strong> {artist.diedYear}
          </p>
        </div>
        <p>{artist.influencesFromJapan}</p>
        <h3>Artworks:</h3>
        <ul className={styles.gallery}>
          {artist.artworks.map((art, index) => (
            <li key={index}>
              <img src={art.url} alt={art.title} />
              <p>{art.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default WesternDetail;
