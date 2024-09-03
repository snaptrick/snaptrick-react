import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Carousel.module.css";
import { DotLottiePlayer } from "@dotlottie/react-player";

interface CarouselItem {
  title: string;
  image: string; // Can be either a .lottie file or a regular image URL
  path: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const navigate = useNavigate();

  // Use HTMLDivElement as the ref type
  const playerRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  const handleMouseEnter = (index: number) => {
    const playerElement = playerRefs.current[index]?.current;
    if (playerElement) {
      const playerInstance = playerElement.querySelector(
        "dotlottie-player"
      ) as any;
      if (playerInstance && typeof playerInstance.play === "function") {
        playerInstance.play(); // Play animation on hover
      }
    }
  };

  const handleMouseLeave = (index: number) => {
    const playerElement = playerRefs.current[index]?.current;
    if (playerElement) {
      const playerInstance = playerElement.querySelector(
        "dotlottie-player"
      ) as any;
      if (playerInstance && typeof playerInstance.stop === "function") {
        playerInstance.stop(); // Stop animation when hover ends
      }
    }
  };

  const handleClick = (index: number) => {
    navigate(items[index].path);
  };

  return (
    <div className={styles.carousel}>
      {items.map((item, index) => {
        if (!playerRefs.current[index]) {
          playerRefs.current[index] = React.createRef<HTMLDivElement>(); // Initialize ref if not present
        }

        return (
          <div
            key={index}
            className={styles.carouselItem}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            onClick={() => handleClick(index)}
            ref={playerRefs.current[index]} // Reference to the wrapper div
          >
            {item.image.endsWith(".lottie") ? (
              <div style={{ width: "100%", height: "100%" }}>
                <DotLottiePlayer
                  src={item.image}
                  autoplay={true}
                  loop
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ) : (
              <img
                src={item.image}
                alt={item.title}
                className={styles.carouselImage}
              />
            )}
            <div className={styles.carouselTitle}>{item.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
