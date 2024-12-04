import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ArtSearch.css'; // Add a CSS file for styling

function ArtSearch() {
  const [arts, setArts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Japanese'); // Default search term
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total number of pages

  const itemsPerPage = 10; // Number of items per page

  useEffect(() => {
    if (searchTerm) {
      fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&per_page=${itemsPerPage}&client_id=VXOMLLioPNVtKFiyGQ6lI1tNnJ01IvR4h98AVrD-MPo`)
        .then((response) => response.json())
        .then((data) => {
          setArts(data.results);
          setTotalPages(Math.ceil(data.total / itemsPerPage)); // Set total pages based on the total results
        })
        .catch((error) => console.log('Error fetching data:', error));
    }
  }, [searchTerm, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1); // Go to next page
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1); // Go to previous page
    }
  };

  return (
    <>
      <h1>Art Search</h1>
      <input
        type="text"
        placeholder="Search for art"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="gallery">
        {arts.map((art) => (
          <div className="art-item" key={art.id}>
            <Link to={`/art/${art.id}`}>
              <img src={art.urls.small} alt={art.alt_description} />
              <p>{art.alt_description}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}

export default ArtSearch;
