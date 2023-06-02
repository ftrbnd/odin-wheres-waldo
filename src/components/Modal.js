import React from 'react';
import styles from '../styles/Modal.module.css';
import { useTargets } from '../utils/TargetsContext';

const Modal = ({ onClose }) => {
    const { targets } = useTargets();

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.Modal}>
                <ul className={styles.targets}> {
                    targets.current.map(target => 
                        <li className={styles.target} key={target[0]}>{ target[0] }</li>
                )} </ul>
                <button onClick={onClose} className={styles.ok}>OK</button>
            </div>
        </>
    );
};

export default Modal;