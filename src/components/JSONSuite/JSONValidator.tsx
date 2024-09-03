import React, { useState } from "react";
import styles from "../Tools.module.css";

const JSONValidator: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleValidate = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2)); // Beautify JSON
      setError(null);
    } catch (e) {
      setError("Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className={styles.tool}>
      <h3>JSON Validator/Beautifier</h3>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON"
        className={styles.jsonInput}
      />
      <button onClick={handleValidate} className={styles.toolButton}>
        Validate & Beautify
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {output && <pre className={styles.result}>{output}</pre>}
    </div>
  );
};

export default JSONValidator;
