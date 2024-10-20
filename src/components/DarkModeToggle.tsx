import React from "react";
import styles from "./DarkModeToggle.module.css";

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  darkMode,
  setDarkMode,
}) => {
  return (
    <div className={styles.toggleContainer}>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span className={styles.slider}></span>
      </label>
      <span className={styles.label}>
        {darkMode ? "Dark Mode" : "Light Mode"}
      </span>
    </div>
  );
};

export default DarkModeToggle;
