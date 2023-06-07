import React from 'react';
import styles from '../../styles/TargetsModal.module.css';

const TargetsModal = ({ onClose, targets, displayName }) => {
    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.TargetsModal}>
                <ul className={styles.targets}> {
                    targets.map(target => 
                        <li className={styles.target} key={target[0]}>{ displayName(target[0]) }</li>
                )} </ul>
                <button onClick={onClose} className={styles.ok}>OK</button>
            </div>
        </>
    );
};

export default TargetsModal;