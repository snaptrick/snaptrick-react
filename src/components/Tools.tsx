import React from "react";
import JSONValidator from "./JSONSuite/JSONValidator";
import JSONComparer from "./JSONSuite/JSONComparer";
import JSONPathFinder from "./JSONSuite/JSONPathFinder";
import CURLSender from "./APIRequestWorkstation/APICurlSender";
import APISequenceTrigger from "./APIRequestWorkstation/APISequenceTrigger";
import URLEncoderDecoder from "./URLEncoderDecoder";
import CharacterCounter from "./CharacterCounter";
import TextGenerator from "./TextGenerator";

import styles from "./Tools.module.css";

const Tools: React.FC = () => {
  return (
    <div className={styles.tools}>
      <h2>Testing Tools Suite</h2>
      <JSONValidator />
      <JSONComparer />
      <JSONPathFinder />
      <CURLSender />
      <APISequenceTrigger />
      <URLEncoderDecoder />
      <CharacterCounter />
      <TextGenerator />
    </div>
  );
};

export default Tools;
