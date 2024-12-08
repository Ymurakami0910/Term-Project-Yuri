import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import styles from "../pages/Inspo.module.css"

function Inspo() {
  const [savedPhotos, setSavedPhotos] = useState([]); // Photo details
  const [inspo, setInspo] = useState(() => {
    const saved = localStorage.getItem("inspo");
    return saved ? JSON.parse(saved) : [];
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
        .catch((error) => console.error("Error fetching photos:", error));
    } else {
      setSavedPhotos([]);
    }
  }, [inspo]);

  const toggleInspo = (photoID) => {
    let updatedInspo;

    if (inspo.includes(photoID)) {
      updatedInspo = inspo.filter((id) => id !== photoID);
    } else {
      updatedInspo = [...inspo, photoID];
    }

    setInspo(updatedInspo);
    localStorage.setItem("inspo", JSON.stringify(updatedInspo));
  };

  return (
    <>
      <h1>This is my list of inspo</h1>
      <ul>
        {savedPhotos.map((art) => (
          <li key={art.id}>
            <Link to={`/art/${art.id}`}>
              <img src={art.urls.small} alt={art.alt_description || "Image"} />
              <p>{art.alt_description || "No description available"}</p>
            </Link>
            <button onClick={() => toggleInspo(art.id)}>
              <FontAwesomeIcon icon={faMinus} style={{ marginRight: "8px" }} />
              {"Remove from your board"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Inspo;
