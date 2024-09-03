import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

interface HeaderProps {
  menuItems: { name: string; path: string }[];
}

const Header: React.FC<HeaderProps> = ({ menuItems }) => (
  <nav className={styles.nav}>
    <ul className={styles.ul}>
      {menuItems.map((item) => (
        <li key={item.name} className={styles.li}>
          <Link to={item.path} className={styles.a}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Header;
