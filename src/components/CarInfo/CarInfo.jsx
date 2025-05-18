import React from 'react';
import styles from './CarInfo.module.css';
import truncateId from '../../utility/idCutter';
import locationIcon from '../../assets/location.svg';

function CarInfo({
  brand,
  model,
  year,
  id,
  address,
  mileage = 0,
  rentalPrice,
  description,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{brand} {model}, {year}</h1>
        <span className={styles.id}>Id: {truncateId(id)}</span>
      </div>

      <p className={styles.subtext}>
        <img src={locationIcon} height={16} width={16} alt="Location" className={styles.icon} />
        <span className={styles.address}>{address}</span>
        <span className={styles.mileage}>Mileage: {mileage.toLocaleString("fr-FR")} km</span>
      </p>


      <p className={styles.price}>${rentalPrice}</p>

      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default CarInfo;
