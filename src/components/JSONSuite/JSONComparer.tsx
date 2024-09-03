import React, { useState } from "react";
import * as diff from "deep-diff";
import styles from "../Tools.module.css";

const JSONComparer: React.FC = () => {
  const [json1, setJson1] = useState<string>("");
  const [json2, setJson2] = useState<string>("");
  const [diffs, setDiffs] = useState<string[]>([]);

  const handleCompare = () => {
    try {
      const obj1 = JSON.parse(json1);
      const obj2 = JSON.parse(json2);
      const differences = diff.diff(obj1, obj2) || [];
      setDiffs(differences.map((d: any) => JSON.stringify(d, null, 2)));
    } catch (e) {
      setDiffs(["Invalid JSON input"]);
    }
  };

  return (
    <div className={styles.tool}>
      <h3>JSON Comparer</h3>
      <textarea
        value={json1}
        onChange={(e) => setJson1(e.target.value)}
        placeholder="Enter first JSON"
        className={styles.jsonInput}
      />
      <textarea
        value={json2}
        onChange={(e) => setJson2(e.target.value)}
        placeholder="Enter second JSON"
        className={styles.jsonInput}
      />
      <button onClick={handleCompare} className={styles.toolButton}>
        Compare
      </button>
      <pre className={styles.result}>{diffs.join("\n")}</pre>
    </div>
  );
};

export default JSONComparer;
