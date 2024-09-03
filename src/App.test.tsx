import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import Carousel from "./components/Carousel";
import ContentSection from "./components/ContentSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import styles from "./App.module.css";

const App: React.FC = () => {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  const carouselItems = [
    { title: "Projects", image: "/images/section1.jpg", path: "/projects" },
    { title: "Find me", image: "/images/section2.jpg", path: "/findme" },
  ];

  const footerLinks = [
    { name: "GitHub", url: "https://github.com/p47r1ckp3t3rs3n" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/patrickpetersendenmark/",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@PatrickPetersen",
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/user/21cgpnjtnrqt7hh7zh3n5dmmq?si=49c1d07cb536424d",
    },
  ];

  return (
    <Router>
      <div className={styles.container}>
        <Header menuItems={menuItems} />
        <Welcome nickNames={["Snap", "Test", "Hack", "Pa", "Dad"]} />
        <Carousel items={carouselItems} />
        <Routes>
          <Route
            path="/projects"
            element={
              <ContentSection
                title="Projects"
                body="This is section 1"
                image="https://images.vivino.com/thumbs/b4frExLjToWu0fbwP77hLQ_pl_375x500.png"
              />
            }
          />
          <Route
            path="/findme"
            element={
              <ContentSection
                title="Find me"
                body="This is section 2"
                image="https://images.pixieset.com/41296677/ade7feb5d9d1a549b98c20ce3d2bf9ec-cover.jpg"
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer links={footerLinks} />
      </div>
    </Router>
  );
};

export default App;
