import React, { useEffect, useRef } from 'react';
import { firestore } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from '../styles/SelectMenu.module.css';

const SelectMenu = ({ selectedX, selectedY, wasClicked }) => {
    const targetsRef = useRef([]);

    useEffect(() => {
        const data = [];

        async function fetchTargets() {
            const querySnapshot = await getDocs(collection(firestore, 'targets'));
            querySnapshot.forEach(doc => {
                data.push([doc.id, doc.data()]);
            });
        };
        
        fetchTargets();
        targetsRef.current = data;
    }, []);

    return (
        <div className={styles.SelectMenu} hidden={wasClicked ? false : true} style={{
            top: `${selectedY}px`,
            left: `${selectedX}px`,
            zIndex: 1000
        }}>
            <ul className={styles.targets}> {
                targetsRef.current.map(target => 
                    <li className={styles.target} key={target[0]}>{ target[0] }</li>
                )
            } </ul>
        </div>
    );
}

export default SelectMenu;