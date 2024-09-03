import React, { useState } from "react";
import axios from "axios";
import styles from "../Tools.module.css";

const APISequenceTrigger: React.FC = () => {
  const [env, setEnv] = useState<string>("https://api.vivino.com");
  const [userId, setUserId] = useState<string>("user123");
  const [accessToken, setAccessToken] = useState<string>("token123");
  const [vintageId, setVintageId] = useState<string>("vintage123");
  const [output, setOutput] = useState<string>("");

  const requests = [
    "/users/:userId/vintages/:vintageId",
    "/users/:userId/recommendations",
  ];

  const executeSequence = async () => {
    let results: string[] = [];
    for (const req of requests) {
      const url = req
        .replace(":userId", userId)
        .replace(":vintageId", vintageId)
        .replace(":accessToken", accessToken);
      try {
        const response = await axios.get(`${env}${url}`);
        results.push(JSON.stringify(response.data, null, 2));
      } catch (e) {
        if (e instanceof Error) {
          results.push(`Error on ${url}: ${e.message}`);
        } else {
          results.push(`Error on ${url}: An unknown error occurred`);
        }
      }
    }
    setOutput(results.join("\n\n"));
  };

  return (
    <div className={styles.tool}>
      <h3>API Sequence Trigger</h3>
      <input
        value={env}
        onChange={(e) => setEnv(e.target.value)}
        placeholder="Environment (e.g., https://api.vivino.com)"
        className={styles.urlInput}
      />
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        className={styles.urlInput}
      />
      <input
        value={accessToken}
        onChange={(e) => setAccessToken(e.target.value)}
        placeholder="Access Token"
        className={styles.urlInput}
      />
      <input
        value={vintageId}
        onChange={(e) => setVintageId(e.target.value)}
        placeholder="Vintage ID"
        className={styles.urlInput}
      />
      <button onClick={executeSequence} className={styles.toolButton}>
        Execute Sequence
      </button>
      <pre className={styles.result}>{output}</pre>
    </div>
  );
};

export default APISequenceTrigger;
