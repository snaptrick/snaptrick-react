import React from "react";
import Carousel from "../components/Carousel";
import ContentSection from "../components/ContentSection";
import Tools from "../components/Tools";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
