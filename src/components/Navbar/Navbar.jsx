import { NavLink } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaHeart, FaUser, FaBookOpen } from "react-icons/fa6";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navContainer}>
      <NavLink
        to="/add-collection"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        <span className={styles.navLink}>
          <BsFillPlusCircleFill size={30} />
          Ajouter
        </span>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        <span className={styles.navLink}>
          <FaBookOpen size={30} />
          Collection
        </span>
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        <span className={styles.navLink}>
          <FaHeart size={30} />
          Envies
        </span>
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        <span className={styles.navLink}>
          <FaUser size={30} />
          Compte
        </span>
      </NavLink>
    </div>
  );
}

export default Navbar;
