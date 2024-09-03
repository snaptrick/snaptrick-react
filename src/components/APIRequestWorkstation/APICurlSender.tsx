import React, { useState } from "react";
import axios from "axios";
import styles from "../Tools.module.css";

const CURLSender: React.FC = () => {
  const [curlCommand, setCurlCommand] = useState<string>("");
  const [curlResponse, setCurlResponse] = useState<string | null>(null);

  const handleCurlSend = async () => {
    let command = curlCommand.trim();
    const urlMatch = command.match(/(https?:\/\/[^\s]+)/);
    let url = urlMatch ? urlMatch[0] : "";

    if (!url) {
      setCurlResponse("Invalid cURL command. Could not extract the URL.");
      return;
    }

    let method: "GET" | "POST" | "PUT" | "DELETE" = "GET";

    if (/curl\s+.*\s+-X\s+POST/.test(command)) {
      method = "POST";
    } else if (/curl\s+.*\s+-X\s+PUT/.test(command)) {
      method = "PUT";
    } else if (/curl\s+.*\s+-X\s+DELETE/.test(command)) {
      method = "DELETE";
    }

    let headers: { [key: string]: string } = {};
    const headerMatches = command.match(/-H\s+'([^']+)'/g);
    if (headerMatches) {
      headerMatches.forEach((header) => {
        const [, key, value] = header.match(/'([^:]+):\s*(.+)'/) || [];
        if (key && value) {
          headers[key.trim()] = value.trim();
        }
      });
    }

    let data = null;
    const dataMatch = command.match(/--data\s+'([^']+)'/);
    if (dataMatch) {
      data = dataMatch[1];
    }

    try {
      const response = await axios({
        method,
        url,
        headers,
        data,
      });
      setCurlResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        setCurlResponse(`Request failed: ${error.message}`);
      } else {
        setCurlResponse("An unknown error occurred");
      }
    }
  };

  return (
    <div className={styles.tool}>
      <h3>cURL Sender</h3>
      <input
        placeholder="Enter cURL command"
        value={curlCommand}
        onChange={(e) => setCurlCommand(e.target.value)}
        className={styles.curlInput}
      />
      <button onClick={handleCurlSend} className={styles.toolButton}>
        Send cURL
      </button>
      {curlResponse && <pre className={styles.result}>{curlResponse}</pre>}
    </div>
  );
};

export default CURLSender;
