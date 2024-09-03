import React, { useState } from "react";
import styles from "./Tools.module.css";

const CharacterCounter: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [countRunes, setCountRunes] = useState<boolean>(false);

  const countCharacters = () => {
    if (countRunes) {
      return new TextEncoder().encode(text).length;
    }
    return text.length;
  };

  return (
    <div className={styles.tool}>
      <h3>Character Counter</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
        className={styles.charInput}
      />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={countRunes}
          onChange={(e) => setCountRunes(e.target.checked)}
        />
        Count Runes (Go)
      </label>
      <p className={styles.result}>Character Count: {countCharacters()}</p>
    </div>
  );
};

export default CharacterCounter;
