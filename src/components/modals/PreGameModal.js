import React from 'react';
import styles from '../../styles/PreGameModal.module.scss';

const PreGameModal = ({ onClose, targets, displayName }) => {
    return (
        <>
            <div className={styles.overlay} />
            <div className={styles.PreGameModal}>
                <h2>Welcome to Where's Spidey!</h2>
                <p>Locate these 3 targets to complete the game:</p>
                <ul className={styles.targets}> {
                    targets.map(target => 
                        <li className={styles.target} key={target[0]}>
                            <img src={target[1].image} alt={target[0]} />
                            <p>{ displayName(target[0]) }</p>
                        </li>
                )} </ul>
                <button onClick={onClose}>Start!</button>
            </div>
        </>
    );
};

export default PreGameModal;