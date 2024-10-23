import React, { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import { Route, Routes, Link } from "react-router-dom"; // No Router import here
import Carousel from "./components/Carousel";
import ContentSection from "./components/ContentSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Tools from "./components/Tools";
import DarkModeToggle from "./components/DarkModeToggle";
import Home from "./pages/Home"; // Home page
import PlannedPlates from "./pages/PlannedPlates"; // PlannedPlates page

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
      {/* Navigation Bar */}
      <nav className={styles.navBar}>
        <Link to="/" className={styles.navItem}>
          Home
        </Link>
        <Link to="/planned-plates" className={styles.navItem}>
          Planned Plates
        </Link>
      </nav>

      {/* Dark Mode Toggle */}
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Routing between Home and Planned Plates pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planned-plates" element={<PlannedPlates />} />
      </Routes>

      <Footer
        links={[
          { name: "GitHub", url: "https://github.com/p47r1ckp3t3rs3n" },
          {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/patrickpetersendenmark/",
          },
          {
            name: "YouTube",
            url: "https://www.youtube.com/@PatrickPetersen",
          },
        ]}
      />
    </div>
  );
};

export default App;
