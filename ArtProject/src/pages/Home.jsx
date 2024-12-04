import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import Header from "../components/header.jsx";
import Button from "../components/button.jsx";
import Footer from "../components/footer.jsx"
import Search from "./Search.jsx";

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".btn_box", {
      duration: 1.2,
      opacity: 0,
      scale: 0.7,
      delay: 1,
      ease: "elastic.out(1, 0.75)",
    });

    gsap.to("footer", {
      duration: 1,
      opacity: 0.6,
      y: 30,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <>  
    <Header/>
        <section className="hero">
          <div className="intro container">
            <p>
              Japanese art, especially ukiyo-e prints, influenced many key
              Impressionist artists, such as Monet, Van Gogh, and Degas.
            </p>
          </div>

          <div className="button-box container">
          <Button label="View Gallery" onClick={() => navigate("/")} />
          <Button label="Get Inspired" onClick={() => navigate("search")} />
          </div>
          
        </section>


        <Footer/>
        

    </>
  );
};

export default Home;
