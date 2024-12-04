import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Details() {
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
    return <div>Loading art details...</div>;
  }

  return (
    <div>
      <h1>{art.alt_description}</h1>
      <img src={art.urls.regular} alt={art.alt_description} />
      <p>{art.description || 'No description available.'}</p>
      <p><strong>Photographer:</strong> {art.user.name}</p>
      <p><strong>Likes:</strong> {art.likes}</p>
    </div>
  );
}

export default Details;
