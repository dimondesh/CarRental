import CarCard from '../CarCard/CarCard';
import styles from './CarList.module.css';

function CarList({ items, favorites, onToggleFavorite }) {
  return (
    <div className={styles.carList}>
      {items.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isFavorite={favorites.includes(car.id)}
          onToggleFavorite={() => onToggleFavorite(car.id)}
        />
      ))}
    </div>
  );
}

export default CarList;
