import { useNavigate } from 'react-router-dom';
import styles from './CarCard.module.css';
import heartActive from '../../assets/heartActive.svg';
import heartNotActive from '../../assets/heartNotActive.svg';

const CarCard = ({ car, isFavorite, onToggleFavorite }) => {
  const {
    id,
    img,
    brand,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    mileage,
    type,
  } = car;

  const location = address.split(',')[1]?.trim() || 'Ukraine';
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={`${brand} ${model}`} className={styles.image} />
        <button className={styles.like} onClick={onToggleFavorite}>
          <img
            src={isFavorite ? heartActive : heartNotActive}
            alt="Like icon"
            className={styles.likeIcon}
          />
        </button>
      </div>

      <div className={styles.text}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>
            {brand} <span className={styles.model}>{model}, </span>{year}
          </h3>
          <span className={styles.price}>${rentalPrice}</span>
        </div>

        <ul className={styles.description}>
          <li>{location}</li>
          <li>Ukraine</li>
          <li>{rentalCompany}</li>
          <li>{type}</li>
          <li>{mileage.toLocaleString("fr-FR")} km</li>
        </ul>
      </div>

      <button
        className={styles.button}
        onClick={() => navigate(`/catalog/${id}`)}>Read more</button>
    </div>
  );
};

export default CarCard;
