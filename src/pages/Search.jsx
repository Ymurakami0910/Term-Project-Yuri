import React, { useState, useEffect } from "react";
import Button from "../components/button";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";

function ArtSearch() {
// 
  const [arts, setArts] = useState([]);
// default search term
  const [searchTerm, setSearchTerm] = useState("Japanese");
  
// state for favorite

  const [fav,setFavs] = useState()

// state for page
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // how many items each page load
  const itemsPerPage = 15;

  useEffect(() => {
    if (searchTerm) {
      fetch(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&per_page=${itemsPerPage}&client_id=VXOMLLioPNVtKFiyGQ6lI1tNnJ01IvR4h98AVrD-MPo`
      )
        .then((response) => response.json())
        .then((data) => {
          setArts(data.results);
          // math for the total pages 
          setTotalPages(Math.ceil(data.total / itemsPerPage));
        })
        // just in case console if the api catch a error
        .catch((error) => console.log("Error fetching data:", error));
    }
  }, [searchTerm, page]);

  // page counter 
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // actual rendering part 

  return (
    <>
      <header className={styles.bar}>
        <h1 className={styles.title}>Art Explorer</h1>
        <input
          type="text"
          className={styles.searchBox}
          placeholder="Search for art"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </header>
      <section className="container">
        <div className={styles.gallery}>
          {arts.map((art) => (
            <Link to={`/art/${art.id}`}>
              <img
                className={styles.artItem}
                src={art.urls.small}
                alt={art.alt_description}
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="container">
        <div className={styles.pageNav}>
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </section>
    </>
  );
}

export default ArtSearch;
