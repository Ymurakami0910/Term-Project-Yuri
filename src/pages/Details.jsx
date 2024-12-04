import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import styles from './Details.module.css'; // CSS Module をインポート

function Details() {
  const navigate = useNavigate(); 

  const [art, setArt] = useState(null);
  const { id } = useParams(); // Get the art ID from the URL

  useEffect(() => {
    // Fetch art details based on the art ID from the URL
    fetch(`https://api.unsplash.com/photos/${id}?client_id=VXOMLLioPNVtKFiyGQ6lI1tNnJ01IvR4h98AVrD-MPo`)
      .then((response) => response.json())
      .then((data) => setArt(data))
      .catch((error) => console.log('Error fetching art details!', error));
  }, [id]); // Include `id` in the dependency array to re-fetch when the ID changes

  if (!art) {
    return <div className={styles.container}>Loading art details...</div>;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backLink}>
        ← Back to gallery
      </button>

      <h1 className={styles.artTitle}>{art.alt_description || 'Untitled'}</h1>
      <img className={styles.artImage} src={art.urls.regular} alt={art.alt_description} />
      <p className={styles.artDescription}>{art.description || 'No description available.'}</p>
      <p className={styles.artInfo}>
        <strong>Photographer:</strong> {art.user.name}
      </p>
      <p className={styles.artLikes}>
        <strong>Likes:</strong> {art.likes}
      </p>
    </div>
  );
}

export default Details;
