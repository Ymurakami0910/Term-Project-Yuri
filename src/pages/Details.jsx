import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Details.module.css'; 
import Button3 from '../components/button3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faArrowLeft,faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


function Details() {
  const navigate = useNavigate(); 

  const [art, setArt] = useState(null);
  const { id } = useParams(); // Get the art ID from the URL

  // 初期状態でinspoをローカルストレージから取得
  const [inspo, setInspo] = useState(() => {
    const savedInspo = localStorage.getItem("inspo");
    return savedInspo ? JSON.parse(savedInspo) : [];
  });

  // Fetch art details based on the art ID from the URL
  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/${id}?client_id=VXOMLLioPNVtKFiyGQ6lI1tNnJ01IvR4h98AVrD-MPo`)
      .then((response) => response.json())
      .then((data) => setArt(data))
      .catch((error) => console.log('Error fetching art details!', error));
  }, [id]); // Include `id` in the dependency array to re-fetch when the ID changes

  if (!art) {
    return <div className={styles.container}>Loading art details...</div>;
  }

  // お気に入りの切り替え
  const toggleInspo = (photoID) => {
    let filteredInspo;

    // お気に入りに追加または削除
    if (inspo.includes(photoID)) {
      filteredInspo = inspo.filter((photoId) => photoId !== photoID);
    } else {
      filteredInspo = [...inspo, photoID];
    }

    // 更新されたinspoをローカルストレージに保存
    localStorage.setItem("inspo", JSON.stringify(filteredInspo));
    setInspo(filteredInspo);
  };

  return (
    <div className={`${styles.container} boxNote divider`}>
      <div className={styles.backBtn}>
      <a onClick={() => navigate(-1)} className={styles.backLink}>
      <FontAwesomeIcon icon={faArrowLeft}/>
      Back to gallery
      </a>
      </div>

      <h1 className={styles.artTitle}>{art.alt_description || 'Untitled'}</h1>

      
      <button onClick={() => toggleInspo(art.id)}>
              <FontAwesomeIcon
                icon={inspo.includes(art.id) ? faMinus : faPlus}
                style={{ marginRight: "8px" }}
              />
              {inspo.includes(art.id)
                ? "Remove from your board"
                : "Add to your board"}
            </button>


      <img className={styles.artImage} src={art.urls.regular} alt={art.alt_description} />
      <p className={styles.artDescription}>{art.description || 'No description available.'}</p>
      <p className={styles.artInfo}>
        <strong>Photographer:</strong> {art.user.name}
      </p>
      <p className={styles.artLikes}>
        <strong><FontAwesomeIcon icon={faHeart} /> Likes:</strong> {art.likes}
      </p>
    </div>
  );
}

export default Details;
