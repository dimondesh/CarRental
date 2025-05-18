import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCars,
  setFilters,
  toggleFavorite,
  incrementPage,
  resetItems,
} from '../../redux/carsSlice';
import Navigation from '../../components/Navigation/Navigation';
import Filters from '../../components/Filters/Filters';
import CarList from '../../components/CarList/CarList';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import styles from './CatalogPage.module.css';
import Spinner from '../../components/Spinner/Spinner';


function CatalogPage() {
  const dispatch = useDispatch();
  const { items, filters, favorites, page, limit, totalPages, loading, error } = useSelector(
    state => state.cars
  );

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    dispatch(fetchCars({ page, limit, ...filters }));
  }, [dispatch, page, limit, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    dispatch(setFilters(localFilters));
    dispatch(resetItems()); 
    dispatch(fetchCars({ page: 1, limit, ...localFilters }));
  };

  const handleToggleFavorite = (carId) => {
    dispatch(toggleFavorite(carId));
  };

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  return (
    <>
      <Navigation />
      <section className={styles.catalog}>
        <Filters filters={localFilters} onChange={handleFilterChange} onSearch={handleSearch} />

        {loading && <div className={styles.loader}><Spinner /></div>}
        {error && <div className={styles.error}>Error: {error}</div>}

        <CarList
          items={items}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {items.length > 0 && page < totalPages && (
          <LoadMoreButton onClick={handleLoadMore} disabled={loading} />
        )}
      </section>
    </>
  );
}

export default CatalogPage;
