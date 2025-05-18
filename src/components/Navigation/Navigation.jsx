import { Link, NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import RentalCar from "../../assets/RentalCar.svg";

function Navigation() {





  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img src={RentalCar} height={16} alt="RentalCar logo" />
      </div>
      <div className={styles.navLinks}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.navLink_active : styles.navLink)}>
          Home
        </NavLink>
        <NavLink to="/catalog" className={({ isActive }) => (isActive ? styles.navLink_active : styles.navLink)}>
          Catalog
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;