import React from 'react';
import styles from '../../styles/TargetsModal.module.scss';

const TargetsModal = ({ onClose, targets, displayName }) => {
    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.TargetsModal}>
                <ul className={styles.targets}> {
                    targets.map(target => 
                        <li className={styles.target} key={target[0]}>
                            <img src={target[1].image} alt={target[0]} />
                            <p>{ displayName(target[0]) }</p>
                        </li>
                )} </ul>
                <button onClick={onClose} className={styles.ok}>OK</button>
            </div>
        </>
    );
};

export default TargetsModal;