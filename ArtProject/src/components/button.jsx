import React from 'react';
import styles from './button.module.css'; // Importing the CSS module


function Button({ label, onClick }) {
    return (
            <button className={styles.primaryButton} onClick={onClick}>
                {label}
            </button>
    );
}

export default Button;
