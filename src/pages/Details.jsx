import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Details.module.css'; 
import Button3 from '../components/button3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faArrowLeft,faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';


function Details() {
  const navigate = useNavigate(); 
  // hook to navigate between routes (button)
  const [art, setArt] = useState(null);
  // State to hold the fetched art details. Initially null.
  
  const { id } = useParams();
  // Extracting the `id` parameter from the URL to identify the specific art piece.

  // Retrieve "inspo" (inspiration) from local storage if it exists.
  const [inspo, setInspo] = useState(() => {
  const savedInspo = localStorage.getItem("inspo");
  return savedInspo ? JSON.parse(savedInspo) : [];
  // Parse the retrieved JSON string, or initialize as an empty array if no data exists.
  });

  // Fetch art details based on the art ID from the URL
  useEffect(() => {
    fetch(`https://api.unsplash.com/photos/${id}?client_id=VXOMLLioPNVtKFiyGQ6lI1tNnJ01IvR4h98AVrD-MPo`)
    // Fetching the details of the specific art using Unsplash API and the `id` from the URL.
      .then((response) => response.json())
      // Converting the response to JSON.
      .then((data) => setArt(data))
      // Setting the fetched data to the `art` state.
      .catch((error) => console.log('Error fetching art details!', error));
      // Logging any errors that occur during the fetch.
  }, [id]); // Include `id` in the dependency array to re-fetch when the ID changes

  if (!art) {
    return <div className={styles.container}>Loading art details...</div>;
  }// If `art` is still null (data hasn't loaded), show a loading message

  // to switch favorite  
  const toggleInspo = (photoID) => {
    let filteredInspo;
    // Placeholder for the updated "inspo" array

    // add favorite or remove 
    if (inspo.includes(photoID)) {
      filteredInspo = inspo.filter((photoId) => photoId !== photoID);
      // remove the photo ID if it's already in the inspo list
    } else {
      filteredInspo = [...inspo, photoID];
      // add the photo ID to the inspo list if it's not already there
    }

    // save the updated inspo list back to local storage.
    localStorage.setItem("inspo", JSON.stringify(filteredInspo));
    // update the inspo state.
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

        
      <img className={styles.artImage} src={art.urls.regular} alt={art.alt_description} />
      <div className={styles.buttonBox}>
      <button className='boardButton' onClick={() => toggleInspo(art.id)}>
              <FontAwesomeIcon
                icon={inspo.includes(art.id) ? faMinus : faPlus}
                // Icon changes based on whether the art is already in the inspo list.
                style={{ marginRight: "8px" }}
              />
              {inspo.includes(art.id)
              // the sentence changes based on whether the art is already in the inspo list.
                ? "Remove from your board"
                : "Add to your board"}
        </button>

        <button className="boardButton"onClick={() => navigate("/inspo")}>Saved Photo List</button>  
        </div>

      <p className={styles.artDescription}>{art.description || 'No description available.'}</p>
      {/* Display the art's description or fallback text if none is available. */}
      <p className={styles.artInfo}>
        <strong>Photographer:</strong> {art.user.name}
      </p>
      <p className={styles.artLikes}>
        <strong><FontAwesomeIcon icon={faHeart} /> Likes:</strong> {art.likes}
        {/* Display the number of likes from API with a heart icon. */}
      </p>
    </div>
  );
}

export default Details;
