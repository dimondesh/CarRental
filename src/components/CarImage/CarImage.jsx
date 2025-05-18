import React from 'react';
import styles from './CarImage.module.css';

function CarImage({ img, brand, model }) {
  return (
    <div className={styles.imageWrapper}>
      <img src={img} alt={`${brand} ${model}`} className={styles.image} />
    </div>
  );
}

export default CarImage;
