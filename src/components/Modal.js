import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal = ({ onClose }) => {
    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.Modal}>
                {
                    // targets from firebase - show images too
                }
                <button onClick={onClose}>OK</button>
            </div>
        </>
    );
};

export default Modal;