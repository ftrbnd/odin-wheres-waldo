import React, { useEffect, useRef } from 'react';
import { firestore } from '../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import styles from '../styles/SelectMenu.module.css';
import navStyles from '../styles/Nav.module.css';

const SelectMenu = ({ xPosition, yPosition, wasClicked, offsetWidth, offsetHeight, coords, onCorrectGuess, onWrongGuess }) => {
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

    const checkSelection = (target) => {
        const xRange = target[1].xRange;
        const yRange = target[1].yRange;

        const navHeight = document.querySelector(`.${navStyles.Nav}`).clientHeight;
        const xValue = coords.current[0] / offsetWidth;
        const yValue = (coords.current[1] - navHeight) / offsetHeight;

        if (xRange[0] <= xValue
            && xValue <= xRange[1]
            && yRange[0] <= yValue
            && yValue <= yRange[1]
        ) {
            onCorrectGuess(target[0]);
        } else {
            onWrongGuess(target[0]);
        }
    };

    return (
        <div className={styles.SelectMenu} hidden={wasClicked ? false : true} style={{
            top: `${yPosition}px`,
            left: `${xPosition}px`,
            zIndex: 1000
        }}>
            <ul className={styles.targets}> {
                targetsRef.current.map(target => 
                    <li className={styles.target} key={target[0]} onClick={() => checkSelection(target)}>{ target[0] }</li>
                )
            } </ul>
        </div>
    );
}

export default SelectMenu;