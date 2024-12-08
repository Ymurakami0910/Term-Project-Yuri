import React from 'react';
import styles from './button3.module.css'; // Importing the CSS module


function Button3({ label, onClick }) {
    return (
            <button className={styles.button3} onClick={onClick}>
                {label}
            </button>
    );
}

export default Button3;