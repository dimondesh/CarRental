import { Link, NavLink } from 'react-router-dom';
import styles from './HomePage.module.css';
import Navigation from '../../components/Navigation/Navigation';
import bannerImage from '../../assets/images/Banner.jpg'; 

function HomePage() {
  return (
    <>
      <Navigation />
      <section className={styles.hero} style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Find your perfect rental car</h1>
          <p className={styles.description}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <NavLink to="/catalog" className={styles.ctaButton}>
            View Catalog
          </NavLink>
        </div>
      </section>
    </>
  );
}

export default HomePage;