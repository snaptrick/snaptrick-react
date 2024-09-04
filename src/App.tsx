import React, { useEffect, useRef } from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import ContentSection from "./components/ContentSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Tools from "./components/Tools";

const App: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (parallaxRef.current) {
      const layers = parallaxRef.current.querySelectorAll<HTMLElement>(
        `.${styles.parallax__layer}`
      );
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.05;
        const x = (window.innerWidth - event.pageX * speed) / 100;
        const y = (window.innerHeight - event.pageY * speed) / 100;

        layer.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.parallax} ref={parallaxRef}>
        <div
          className={`${styles.parallax__layer} ${styles.parallax__layer__back}`}
        >
          <div className={styles.curve} />
        </div>
        <div
          className={`${styles.parallax__layer} ${styles.parallax__layer__front}`}
        >
          <div className={styles.circle} style={{ top: "20%", left: "70%" }} />
        </div>
      </div>
      <Header
        menuItems={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
          { name: "Tools", path: "/tools" },
        ]}
      />
      <Welcome nickNames={["Snaptrick", "Dadtrick", "Hacktrick"]} />
      <Carousel
        items={[
          {
            title: "Vivino: Cellar on web",
            image:
              "https://snaptrick.github.io/snaptrick-react/cellar_benefits_v1.lottie",
            path: "/projects",
          },
          {
            title: "Vivino: Food pairings",
            image: "https://snaptrick.github.io/snaptrick-react/snaptrick.png",
            path: "/projects",
          },
        ]}
      />
      <ContentSection
        title="Section"
        body="Section body"
        image="https://snaptrick.github.io/snaptrick-react/snaptrick.png"
      />
      <Tools /> {/* Add the Tools section here */}
      <Contact />
      <Footer
        links={[
          { name: "GitHub", url: "https://github.com/p47r1ckp3t3rs3n" },
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/patrickpetersendenmark/",
          },
          { name: "YouTube", url: "https://www.youtube.com/@PatrickPetersen" },
        ]}
      />
    </div>
  );
};

export default App;
