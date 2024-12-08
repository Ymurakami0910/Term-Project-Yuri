import React from 'react';
import styles from './button2.module.css'; // Importing the CSS module


function Button2({ label, onClick }) {
    return (
            <button className={styles.button2} onClick={onClick}>
                {label}
            </button>
    );
}

export default Button2;