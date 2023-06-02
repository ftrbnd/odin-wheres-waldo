import React, { useRef } from 'react';
import styles from '../styles/SelectMenu.module.css';
import navStyles from '../styles/Nav.module.css';
import { useTargets } from '../utils/TargetsContext';

const SelectMenu = ({ xPosition, yPosition, wasClicked, offsetWidth, offsetHeight, coords, onCorrectGuess, onWrongGuess, onDuplicateGuess }) => {
    const { targets } = useTargets();
    const correctGuesses = useRef([]);

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
        ) { // valid selection
            if (!correctGuesses.current.includes(target[0])) { // prevent duplicate selection
                correctGuesses.current = [...correctGuesses.current, target[0]];
                onCorrectGuess(target[0]);
            } else {
                onDuplicateGuess(target[0]);
            }
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
                targets.current.map(target => 
                    <li className={styles.target} key={target[0]} onClick={() => checkSelection(target)}>{ target[0] }</li>
                )
            } </ul>
        </div>
    );
}

export default SelectMenu;