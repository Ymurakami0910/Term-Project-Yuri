import React, { useState, useEffect } from "react";
import Button2 from "../components/button2";
import Button3 from "../components/button3";
import { useNavigate ,Link } from "react-router-dom";
import styles from "./Search.module.css";
import ListButton from "../components/button4.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ArtSearch() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);// Function to navigate back to the previous page
  };

  const [arts, setArts] = useState([]);
  // State to hold the array of art data fetched from the API

  const [searchTerm, setSearchTerm] = useState("Japanese"); 
  // State to store the search term; initialized with "Japanese" as the default
  const [searchInput, setSearchInput] = useState("");
   // State to track the value currently being entered in the search input

  const [page, setPage] = useState(1);
  //  State to manage the current page number.
  const [totalPages, setTotalPages] = useState(1);
  // State to store the total number of pages returned by the API
  const itemsPerPage = 15;
  //defining how many items to show per page



  // 検索処理
  const handleSearch = () => {
    setSearchTerm(searchInput); 
    // // updates the search term to the value entered by the user.
    setPage(1); 
    // reset the page 
  };

  useEffect(() => {
    if (searchTerm) {
      fetch(
         // fetching art data from the Unsplash API based on the search term, page number, and items per page.
        `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&per_page=${itemsPerPage}&client_id=VXOMLLioPNVtKFiyGQ6lI1tNnJ01IvR4h98AVrD-MPo`
      )
        .then((response) => response.json())
         // Converting the response to JSON.
        .then((data) => {
          setArts(data.results);
          // setting the fetched art data to the `arts` state.
          setTotalPages(Math.ceil(data.total / itemsPerPage));
          // calculating the total number of pages based on the API response.
        })
        
        // Logging any errors during the fetch operation.
        .catch((error) => console.log("Error fetching data:", error));
    }
  }, [searchTerm, page]);// Logging any errors during the fetch operation.


  // next page
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // previous page
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
  <header className={styles.bar}>
    <div className={styles.leftSection}>
      <button onClick={handleBackClick} className={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
      </button>
      <h1 className={styles.title}>Art Explorer</h1>
    </div>
    <div className={styles.searchContainer}>
  <input
    type="text"
    className={styles.searchBox}
    placeholder="Search for art"
    value={searchInput}
    onChange={(event) => setSearchInput(event.target.value)}
  />
  <Button2 label="Search" onClick={handleSearch} />
  <button onClick={() => navigate("/inspo")} className={ListButton.ListButton}>
    Saved
  </button>
</div>

  </header>
      <section className="bg-2">
        <div className="container">
          <div className={styles.gallery}>
            {/* map the API element */}
            {arts.map((art) => (
              <div key={art.id}>
                <Link to={`/art/${art.id}`}>
                  {/* Link to navigate to the detailed view of the selected art */}
                  <img
                    className={styles.artItem}
                    src={art.urls.small}
                    alt={art.alt_description}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container">
        <div className={styles.pageNav}>
          <Button3 label="Previous" onClick={handlePrevPage}/>

          <span>
            Page {page} of {totalPages}
          </span>
          <Button3 label="Next" onClick={handleNextPage}/>

        </div>
      </section>
    </>
  );
}

export default ArtSearch;
