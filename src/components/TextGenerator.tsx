import React, { useState } from "react";
import styles from "./Tools.module.css";

const TextGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(100);
  const [includeEmojis, setIncludeEmojis] = useState<boolean>(false);
  const [includeSpecialChars, setIncludeSpecialChars] =
    useState<boolean>(false);
  const [generatedText, setGeneratedText] = useState<string>("");

  const generateText = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    const emojis = "😀😃😄😁😆😅😂🤣😊😇";

    let availableChars = chars;
    if (includeSpecialChars) availableChars += specialChars;
    if (includeEmojis) availableChars += emojis;

    let result = "";
    for (let i = 0; i < length; i++) {
      result += availableChars.charAt(
        Math.floor(Math.random() * availableChars.length)
      );
    }
    setGeneratedText(result);
  };

  return (
    <div className={styles.tool}>
      <h3>Text Generator</h3>
      <input
        type="number"
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        placeholder="Number of characters"
        className={styles.urlInput}
      />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={includeEmojis}
          onChange={(e) => setIncludeEmojis(e.target.checked)}
        />
        Include Emojis
      </label>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={includeSpecialChars}
          onChange={(e) => setIncludeSpecialChars(e.target.checked)}
        />
        Include Special Characters
      </label>
      <button onClick={generateText} className={styles.toolButton}>
        Generate
      </button>
      <p className={styles.result}>{generatedText}</p>
    </div>
  );
};

export default TextGenerator;
