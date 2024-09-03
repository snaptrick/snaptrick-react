import React, { useState } from "react";
import styles from "./Tools.module.css";

const URLEncoderDecoder: React.FC = () => {
  const [urlInput, setUrlInput] = useState<string>("");
  const [encodedUrl, setEncodedUrl] = useState<string>("");
  const [decodedUrl, setDecodedUrl] = useState<string>("");

  const handleUrlEncode = () => setEncodedUrl(encodeURIComponent(urlInput));
  const handleUrlDecode = () => setDecodedUrl(decodeURIComponent(urlInput));

  return (
    <div className={styles.tool}>
      <h3>URL Encoder/Decoder</h3>
      <input
        placeholder="Enter URL"
        value={urlInput}
        onChange={(e) => setUrlInput(e.target.value)}
        className={styles.urlInput}
      />
      <button onClick={handleUrlEncode} className={styles.toolButton}>
        Encode
      </button>
      <button onClick={handleUrlDecode} className={styles.toolButton}>
        Decode
      </button>
      {encodedUrl && <p className={styles.result}>Encoded: {encodedUrl}</p>}
      {decodedUrl && <p className={styles.result}>Decoded: {decodedUrl}</p>}
    </div>
  );
};

export default URLEncoderDecoder;
