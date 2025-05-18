import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CarRentForm.module.css';
import { toast } from 'react-toastify';

function CarRentForm() {
    const [startDate, setStartDate] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        console.log('Form submitted:', { ...formData, date: startDate });

        toast.success('Booking request sent successfully!');
        setFormData({ name: '', email: '', comment: '' });
        setStartDate(null);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Book your car now</h3>
            <p className={styles.subtitle}>Stay connected! We are always ready to help you.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    className={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    className={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Booking date"
                    className={styles.input}
                    calendarClassName={styles.calendar}
                    dateFormat="dd MMMM yyyy"
                    required
                />
                <textarea
                    name="comment"
                    placeholder="Comment"
                    className={styles.textarea}
                    value={formData.comment}
                    onChange={handleChange}
                />
                <button type="submit" className={styles.button}>Send</button>
            </form>
        </div>
    );
}

export default CarRentForm;
