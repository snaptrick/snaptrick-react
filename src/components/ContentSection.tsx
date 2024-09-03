import React from "react";
import styles from "./ContentSection.module.css";

interface ContentSectionProps {
  title: string;
  body: string;
  image: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  body,
  image,
}) => (
  <div className={styles.contentSection}>
    <h2>{title}</h2>
    <p>{body}</p>
    <img src={image} alt={title} className={styles.image} />
  </div>
);

export default ContentSection;
