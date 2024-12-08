import React, { useState, useEffect } from "react";
import Button2 from "../components/button2";
import Button3 from "../components/button3";
import { useNavigate ,Link } from "react-router-dom";
import styles from "./Search.module.css";

function ArtSearch() {
  const navigate = useNavigate();

  const [arts, setArts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Japanese"); // デフォルトの検索ワード
  const [searchInput, setSearchInput] = useState(""); // 入力中の値
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 15;



  // 検索処理
  const handleSearch = () => {
    setSearchTerm(searchInput); // 入力された値で検索実行
    setPage(1); // ページをリセット
  };

  useEffect(() => {
    if (searchTerm) {
      fetch(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}&per_page=${itemsPerPage}&client_id=VXOMLLioPNVtKFiyGQ6lI1tNnJ01IvR4h98AVrD-MPo`
      )
        .then((response) => response.json())
        .then((data) => {
          setArts(data.results);
          setTotalPages(Math.ceil(data.total / itemsPerPage));
        })
        .catch((error) => console.log("Error fetching data:", error));
    }
  }, [searchTerm, page]);


  // 次のページ
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  // 前のページ
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <header className={styles.bar}>
        <h1 className={styles.title}>Art Explorer</h1>
        <button onClick={() => navigate("/inspo")}>Lists</button>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchBox}
            placeholder="Search for art"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button2 label="search" onClick={handleSearch} />
        </div>
      </header>
      <section className="bg-2">
        <div className="container">
          <div className={styles.gallery}>
            {arts.map((art) => (
              <div key={art.id}>
                <Link to={`/art/${art.id}`}>
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
