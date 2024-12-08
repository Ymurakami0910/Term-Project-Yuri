import React, { useEffect } from "react";
import gsap from "gsap";

import styles from './footer.module.css'; // Importing the CSS module

function Footer () {

    useEffect(() => {
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
        <footer className={styles.footer}>
        <p>&copy; 2024 Impressionism & Japanese Art Project</p>
        <p>Yurino Murakami</p>
      </footer>
    );
}

export default Footer;