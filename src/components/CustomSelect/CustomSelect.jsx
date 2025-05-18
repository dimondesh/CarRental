import React, { useState, useRef, useEffect } from 'react';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';
import styles from './CustomSelect.module.css';
import arrowDown from '../../assets/arrowDown.svg';
import arrowUp from '../../assets/arrowUp.svg';

const CustomSelect = ({ label, options, value, onChange, placeholder, formatSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOpen = () => setIsOpen(!isOpen);

    const getLabelByValue = (val) => {
        if (!val) return placeholder;

        if (typeof options[0] === 'object') {
            const found = options.find((opt) => opt.value === val);
            if (!found) return placeholder;
            return formatSelected ? formatSelected(found.label) : found.label;
        }

        return formatSelected ? formatSelected(val) : val;
    };

    const handleSelect = (option) => {
        const selectedValue = typeof option === 'object' ? option.value : option;
        onChange(selectedValue);
        setIsOpen(false);
    };

    return (
        <div className={styles.wrapper} ref={ref}>
            {label && <label className={styles.label}>{label}</label>}

            <div className={styles.selectWrapper}>
                <div
                    className={`${styles.select} ${isOpen ? styles.open : ''}`}
                    onClick={toggleOpen}
                >
                    {getLabelByValue(value)}
                    <img
                        src={isOpen ? arrowUp : arrowDown}
                        alt="arrow"
                        className={styles.icon}
                    />
                </div>

                {isOpen && (
                    <div className={styles.dropdown}>
                        <SimpleBar style={{ maxHeight: 200 }}>
                            {options.map((option) => {
                                const val = typeof option === 'object' ? option.value : option;
                                const label = typeof option === 'object' ? option.label : option;

                                return (
                                    <div
                                        key={val}
                                        className={`${styles.option} ${val === value ? styles.active : ''}`}
                                        onClick={() => handleSelect(option)}
                                    >
                                        {label}
                                    </div>
                                );
                            })}
                        </SimpleBar>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;