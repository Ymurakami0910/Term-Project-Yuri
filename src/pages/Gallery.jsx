// This is for web interaction corse

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";

import Button from "../components/button";
import Header from "../components/header";
import Monet from "../assets/thumb-m.jpg";
import Hokusai from "../assets/thumb-k.jpg";

function Gallery() {
  const navigate = useNavigate();

  useEffect(() => {
    // Animate the left panel
    gsap.fromTo(
      ".left-panel",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.5 }
    );

    // Animate the right panel
    gsap.fromTo(
      ".right-panel",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out", delay: 0.5 }
    );
  }, []);



  return (
    <>
      <Header />
      <section>
        <div className="container divider">
          <h1>The Japanese Influence on Impressionism</h1>
          <div className="wrap">
            <div className="left-panel">
              <Button
                label="Learn About Western Artists"
                onClick={() => navigate("/western")}
              />
              <img src={Monet} alt="Japanese Bridge" />
            </div>
            <div className="right-panel">
              <img src={Hokusai} alt="Ukiyo-e Hokusai" />
              <Button
                label="Learn About Japanese Artists"
                onClick={() => navigate("/japanese")}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Gallery;
