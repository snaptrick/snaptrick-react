import React from "react";
import styles from "./Footer.module.css";

interface FooterProps {
  links: { name: string; url: string }[];
}

const Footer: React.FC<FooterProps> = ({ links }) => (
  <footer className={styles.footer}>
    <ul className={styles.ul}>
      {links.map((link) => (
        <li key={link.name} className={styles.li}>
          <a
            href={link.url}
            className={styles.a}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </footer>
);

export default Footer;
