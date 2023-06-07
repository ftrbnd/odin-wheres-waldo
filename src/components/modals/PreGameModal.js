import React from 'react';
import styles from '../../styles/PreGameModal.module.css';
import { useTargets } from '../../utils/TargetsContext';

const PreGameModal = ({ onClose }) => {
    const { targets } = useTargets();

    return (
        <>
            <div className={styles.overlay} />
            <div className={styles.PreGameModal}>
                <h2>Welcome to Where's Waldo!</h2>
                <p>Locate these 3 targets to complete the game:</p>
                <ul className={styles.targets}> {
                    targets.map(target => 
                        <li className={styles.target} key={target[0]}>{ target[0] }</li>
                )} </ul>
                <button onClick={onClose}>Start!</button>
            </div>
        </>
    );
};

export default PreGameModal;