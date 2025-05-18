import styles from './CarDescription.module.css';

function CarDescription({ price, description }) {
    return (
        <div className={styles.wrapper}>
            <p className={styles.price}>${price}</p>
            <p className={styles.text}>{description}</p>
        </div>
    );
}

export default CarDescription;
