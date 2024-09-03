import React, { useState, useEffect } from "react";
import styles from "./Welcome.module.css";

interface WelcomeProps {
  nickNames: string[];
}

const Welcome: React.FC<WelcomeProps> = ({ nickNames }) => {
  const [currentNick, setCurrentNick] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [dots, setDots] = useState(""); // Dots to simulate thinking
  const [isBlinking, setIsBlinking] = useState(false); // Control blinking before deletion

  useEffect(() => {
    const handleTyping = () => {
      const currentNickname = nickNames[currentNick];

      if (isDeleting) {
        setDisplayedText((prev) => prev.slice(0, -1));
        setTypingSpeed(50);
      } else if (displayedText.length < currentNickname.length) {
        setDisplayedText((prev) => currentNickname.slice(0, prev.length + 1));
        setTypingSpeed(150);
      } else if (dots.length < 3) {
        setDots((prev) => prev + ".");
        setTypingSpeed(150); // Dots type at the same speed
      } else if (!isBlinking) {
        setIsBlinking(true);
        setTypingSpeed(1500); // Pause for 1.5 seconds to let the cursor blink twice
      } else if (isBlinking) {
        setIsDeleting(true);
        setDots("");
        setIsBlinking(false);
      }

      if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentNick((prev) => (prev + 1) % nickNames.length);
        setTypingSpeed(150);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [
    displayedText,
    isDeleting,
    typingSpeed,
    dots,
    isBlinking,
    currentNick,
    nickNames,
  ]);

  return (
    <div className={styles.welcome}>
      <h1>
        World of {displayedText}
        {dots}
      </h1>
    </div>
  );
};

export default Welcome;
