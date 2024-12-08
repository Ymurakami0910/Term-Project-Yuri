import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import artistData from "../data/western.json"; // western.jsonのインポート
import styles from './Western.module.css'; // CSSモジュールのインポート
import Header from '../components/header';
import { gsap } from "gsap";


function Western() {
  const [artistsData, setArtistsData] = useState([]);

  useEffect(() => {
    setArtistsData(artistData.westernArtists);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".boxNote", // boxNoteクラスにアニメーションを適用
      {
        opacity: 0, // 初期状態で非表示
        transform: "translateY(100px)", // 下に配置
      },
      {
        opacity: 1, // 表示
        transform: "translateY(0)", // 元の位置に戻す
        duration: 1.2, // アニメーションの速度
        stagger: 0.2, // 各アイテムのアニメーションの間隔を設定（0.2秒ごと）
        ease: "power3.out", // イージング
      }
    );
  }, []); // 初回レンダリング時に一度だけ実行

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
