import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/Inspo.module.css"
import Header from "../components/header";


function Inspo() {
  const [savedPhotos, setSavedPhotos] = useState([]); // State to store detailed information about saved photos.
  const [inspo, setInspo] = useState(() => {
    const saved = localStorage.getItem("inspo");
     // Retrieve saved photo IDs from local storage on initial render
    return saved ? JSON.parse(saved) : [];
     // Parse and return the saved photo IDs or return an empty array if none exist.
  });

  useEffect(() => {
    // Fetch photo details for saved IDs
    if (inspo.length > 0) {
      Promise.all(
        inspo.map((id) =>
          fetch(
            `https://api.unsplash.com/photos/${id}?client_id=VXOMLLioPNVtKFiyGQ6lI1tNnJ01IvR4h98AVrD-MPo`
          )
            .then((response) => response.json())
            .catch((error) => console.error("Error fetching photo:", error))
        )
      )
        .then((photos) => setSavedPhotos(photos))
        // Set the fetched photo details in the `savedPhotos` state
        .catch((error) => console.error("Error fetching photos:", error));
    } else {
      setSavedPhotos([]);
      // Clear saved photos if there are no saved photo IDs
    }
  }, [inspo]); // Re-run the effect whenever `inspo` changes

  const toggleInspo = (photoID) => {
    let updatedInspo;

    if (inspo.includes(photoID)) {
      updatedInspo = inspo.filter((id) => id !== photoID);
       // if the photo ID already exists, remove it
    } else {
      updatedInspo = [...inspo, photoID];
      // if the photo ID does not exist, add it
    }

    setInspo(updatedInspo);
    // update the `inspo` state with the new list.
    localStorage.setItem("inspo", JSON.stringify(updatedInspo));
    // save the updated list to local storage
  };

  return (
    <>
    <Header/>
    <section className="container divider">
      <h1>Saved Photos</h1>
      <div className={styles.galleryX}>
        {savedPhotos.map((art) => (
          <div key={art.id} className={`${styles.card} boxNote`}>
            <Link className={styles.art} to={`/art/${art.id}`}>
              <img className={styles.artItemX} src={art.urls.small} alt={art.alt_description || "Image"} />
              <p>{art.alt_description || "No description available"}</p>
              {/* Display the art's description or a fallback text */}
            </Link>
            <button className="boardButton"onClick={() => toggleInspo(art.id)}>
              <FontAwesomeIcon icon={faMinus} style={{ marginRight: "8px" }} />
              {"Remove from your board"}
            </button>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}

export default Inspo;
