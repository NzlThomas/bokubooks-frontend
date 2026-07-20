import { NavLink } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaHeart, FaUser, FaBookOpen } from "react-icons/fa6";
import { IoIosStats } from "react-icons/io";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.desktopContainer}>
      <div className={styles.navContainer}>
        <NavLink
          to="add-collection"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <span className={styles.navLink}>
            <BsFillPlusCircleFill className={styles.navIcon} />
            Ajouter
          </span>
        </NavLink>
        <NavLink
          to="/app"
          end
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <span className={styles.navLink}>
            <FaBookOpen className={styles.navIcon} />
            Collection
          </span>
        </NavLink>
        <NavLink
          to="wishlist"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <span className={styles.navLink}>
            <FaHeart className={styles.navIcon} />
            Envies
          </span>
        </NavLink>
        <NavLink
          to="statistics"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <span className={styles.navLink}>
            <IoIosStats className={styles.navIcon} />
            Stats.
          </span>
        </NavLink>
        <NavLink
          to="dashboard"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <span className={styles.navLink}>
            <FaUser className={styles.navIcon} />
            Compte
          </span>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
