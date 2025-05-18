import React from 'react';
import styles from './CarDetailsList.module.css';
import checkmark from '../../assets/check.svg';
import date from '../../assets/date.svg';
import carType from '../../assets/carType.svg';
import fuel from '../../assets/fuel.svg';
import engine from '../../assets/engine.svg';

function CarDetailsList({ car }) {
    const {
        rentalConditions, fuelConsumption, engineSize, year, type,
        accessories, functionalities
    } = car;

    return (
        <div className={styles.container}>
            <section>
                <h3 className={styles.title}>Rental Conditions:</h3>
                <ul className={styles.specsList}>
                    {rentalConditions.map((cond, i) => (
                        <li key={i}><img src={checkmark} alt="Check mark" height={16} width={16} className={styles.icon} /> {cond}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h3 className={styles.title}>Car Specifications:</h3>
                <ul className={styles.specsList}>
                    <li>
                        <img src={date} alt="Year" height={16} width={16} className={styles.icon} />
                        Year: {year}
                    </li>
                    <li>
                        <img src={carType} alt="Type" height={16} width={16} className={styles.icon} />
                        Type: {type}
                    </li>
                    <li>
                        <img src={fuel} alt="Fuel Consumption" height={16} width={16} className={styles.icon} />
                        Fuel Consumption: {fuelConsumption}
                    </li>
                    <li>
                        <img src={engine} alt="Engine Size" height={16} width={16} className={styles.icon} />
                        Engine Size: {engineSize}
                    </li>
                </ul>
            </section>

            <section>
                <h3 className={styles.title}>Accessories and functionalities:</h3>
                <ul className={styles.specsList}>
                    {[...accessories, ...functionalities].map((item, i) => (
                        <li key={i}><img src={checkmark} alt="Check mark" height={16} width={16} className={styles.icon} /> {item}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default CarDetailsList;
