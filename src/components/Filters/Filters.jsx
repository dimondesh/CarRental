import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Filters.module.css';
import CustomSelect from '../CustomSelect/CustomSelect';

function Filters({ filters, onChange, onSearch }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('https://car-rental-api.goit.global/brands');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setBrands(['Buick', 'Volvo', 'Subaru']);
      }
    };
    fetchBrands();
  }, []);

  const handleCustomChange = (name, value) => {
    onChange({ target: { name, value } });
  };

  const formatNumber = (num) => {
    if (!num) return '';
    const cleanNum = String(num).replace(/\D/g, '');
    return Number(cleanNum).toLocaleString('en-US');
  };

  const priceOptions = ['30', '40', '50', '60', '70', '80', '90', '100', '110'].map(price => ({
    value: price,
    label: price,
  }));

  return (
    <div className={styles.filters}>
      <div className={styles.filterGroup}>
        <CustomSelect
          label="Car brand"
          placeholder="Choose a brand"
          options={brands}
          value={filters.brand}
          onChange={(value) => handleCustomChange('brand', value)}
        />
      </div>

      <div className={styles.filterGroup}>
        <CustomSelect
          label="Price / 1 hour"
          placeholder="Choose a price"
          options={priceOptions}
          value={filters.rentalPrice}
          onChange={(value) => handleCustomChange('rentalPrice', value)}
          formatSelected={(val) => `To $${val}`}
        />
      </div>

      <div className={styles.filterGroup}>
        <label>Car mileage / km</label>
        <div className={styles.mileageWrapper}>
          <input
            type="text"
            name="minMileage"
            value={`From ${formatNumber(filters.minMileage)}`}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, '');
              onChange({ target: { name: 'minMileage', value: rawValue } });
            }}
            placeholder="From"
            className={styles.mileageInputLeft}
          />
          <input
            type="text"
            name="maxMileage"
            value={`To ${formatNumber(filters.maxMileage)}`}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, '');
              onChange({ target: { name: 'maxMileage', value: rawValue } });
            }}
            placeholder="To"
            className={styles.mileageInputRight}
          />
        </div>
      </div>

      <button className={styles.searchButton} onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default Filters;
