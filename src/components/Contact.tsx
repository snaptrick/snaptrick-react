import React from "react";
import styles from "./Contact.module.css";

const Contact: React.FC = () => (
  <div className={styles.contact}>
    <h2>Contact Me</h2>
    <form className={styles.form}>
      <input type="email" placeholder="Your email" className={styles.input} />
      <textarea
        placeholder="Your message"
        className={styles.textarea}
      ></textarea>
      <button type="submit" className={styles.button}>
        Send
      </button>
    </form>
  </div>
);

export default Contact;
