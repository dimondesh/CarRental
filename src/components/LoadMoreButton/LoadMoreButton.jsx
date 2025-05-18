import { useSelector } from 'react-redux';
import styles from './LoadMoreButton.module.css';

function LoadMoreButton({ onClick, disabled }) {
  const isFetchingMore = useSelector(state => state.cars.isFetchingMore);

  return (
    <button
      className={styles.loadMore}
      onClick={onClick}
      disabled={disabled || isFetchingMore}
    >
      {isFetchingMore ? (
        <span className={styles.spinner}></span>
      ) : (
        'Load more'
      )}
    </button>
  );
}

export default LoadMoreButton;
