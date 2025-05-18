import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCarById } from '../../redux/carsSlice';


import CarImage from '../../components/CarImage/CarImage';
import CarInfo from '../../components/CarInfo/CarInfo';
import CarDetailsList from '../../components/CarDetailsList/CarDetailsList';
import CarRentForm from '../../components/CarRentForm/CarRentForm';
import Navigation from '../../components/Navigation/Navigation';
import Spinner from '../../components/Spinner/Spinner';


import styles from './CarDetailsPage.module.css';

function CarDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedCar: car, loading } = useSelector(state => state.cars);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (loading) return <div className={styles.loader}><Spinner /></div>;
  if (!car) return <div className={styles.error}>Car not found.</div>;

  return (
    <>
      <Navigation />
      <section className={styles.page}>
        <div className={styles.left}>
          <CarImage img={car.img} brand={car.brand} model={car.model} />
          <CarRentForm />
        </div>
        <div className={styles.right}>
          <CarInfo {...car} />
          <CarDetailsList car={car} />
        </div>
      </section>
    </>
  );
}

export default CarDetailsPage;
