import React, { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import Carousel from "./components/Carousel";
import ContentSection from "./components/ContentSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Tools from "./components/Tools";
import DarkModeToggle from "./components/DarkModeToggle"; // Add dark mode toggle component

const App: React.FC = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [darkMode, setDarkMode] = useState(false);

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
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>World of Snaptrick...</h1>
          <button className={styles.adminButton}>Admin</button>
        </div>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </section>

      {/* Floating Navigation */}
      <nav className={styles.navBar}>
        <a href="#about" className={styles.navItem}>
          About
        </a>
        <a href="#projects" className={styles.navItem}>
          Projects
        </a>
        <a href="#tools" className={styles.navItem}>
          Tools
        </a>
        <a href="#world" className={styles.navItem}>
          World
        </a>
        <a href="#connect" className={styles.navItem}>
          Connect
        </a>
      </nav>

      {/* Carousel Section */}
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
        title="Projects"
        body="This is the project section"
        image="https://snaptrick.github.io/snaptrick-react/snaptrick.png"
      />
      <Tools />
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
