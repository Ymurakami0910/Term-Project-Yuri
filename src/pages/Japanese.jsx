// This is for web interaction corse

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gakaData from "../data/japanese.json"; 
import styles from "./Western.module.css"; 
import Header from "../components/header";

function Japanese() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    if (gakaData && gakaData.japaneseArtists) {
      setArtists(gakaData.japaneseArtists);
    }
  }, []); 


  return (
    <>
    <Header/>
    <div className={`${styles.container} divider`}>
        {artists.map((artist, index) => (
          <div key={index} className="boxNote">
            <Link to={`/gaka/${index}`} className={styles.link}>
              <img src={artist.profilePic} alt={artist.name} className={styles.profilePic} />
              <h1 className={styles.artistName}>{artist.name}</h1>
            </Link>
          </div>
        ))}
    </div>
    </>
  );
}

export default Japanese;
