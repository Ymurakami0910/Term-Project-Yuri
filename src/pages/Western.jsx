// This is for web interaction corse

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import artistData from "../data/western.json"; 
import styles from './Western.module.css'; 
import Header from '../components/header';
import { gsap } from "gsap";


function Western() {
  const [artistsData, setArtistsData] = useState([]);

  useEffect(() => {
    setArtistsData(artistData.westernArtists);
  }, []);






  return (
    <>
    <Header/>
    <div className={`${styles.container} divider`}>
        {artistsData.map((artist, index) => (
          <div key={index} className="boxNote">
            <Link to={`/artist/${index}`} className={styles.link}>
              <img src={artist.profilePic} alt={artist.name} className={styles.profilePic} />
              <h1 className={styles.artistName}>{artist.name}</h1>
            </Link>
          </div>
        ))}
    </div>
    </>
  );
}

export default Western;
