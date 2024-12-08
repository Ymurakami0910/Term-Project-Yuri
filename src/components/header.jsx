import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigateをインポート
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";

function Header() {
  const navigate = useNavigate(); // フックでnavigate関数を取得

  const handleBackClick = () => {
    navigate(-1); // 前のページに戻る
  };

  return (
    <header className={styles.header}>
      <button onClick={handleBackClick} className={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
        Back
      </button>
      <h1 className={styles.title}>Impressionism & Japanese Art</h1>
    </header>
  );
}

export default Header;
