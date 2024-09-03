import React, { useState } from "react";
import styles from "../Tools.module.css";

const JSONTreeView: React.FC<{ data: any }> = ({ data }) => {
  if (
    typeof data === "string" ||
    typeof data === "number" ||
    typeof data === "boolean"
  ) {
    return <div>{String(data)}</div>;
  }

  if (Array.isArray(data)) {
    return (
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <JSONTreeView data={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (typeof data === "object" && data !== null) {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{key}: </strong>
            <JSONTreeView data={value} />
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

const JSONPathFinder: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [jsonTree, setJsonTree] = useState<object | null>(null);
  const [selectedPath, setSelectedPath] = useState<string>("");

  const handleRenderTree = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonTree(parsed);
    } catch (e) {
      setJsonTree(null);
      setSelectedPath("Invalid JSON");
    }
  };

  const handleSelectNode = (node: any, path: string) => {
    setSelectedPath(path);
  };

  return (
    <div className={styles.tool}>
      <h3>JSON Path Finder</h3>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON"
        className={styles.jsonInput}
      />
      <button onClick={handleRenderTree} className={styles.toolButton}>
        Render Tree
      </button>
      {jsonTree && <JSONTreeView data={jsonTree} />}
      {selectedPath && <p>Path: {selectedPath}</p>}
    </div>
  );
};

export default JSONPathFinder;
