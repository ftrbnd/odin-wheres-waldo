import React, { useRef, useState } from 'react';
import styles from '../styles/Game.module.css';
// import navStyles from '../styles/Nav.module.css';
import SelectMenu from './SelectMenu';

const Game = () => {
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [clicked, setClicked] = useState(false);
    const imgRef = useRef();

    const updateCoords = (e) => {
        setClicked(true);
        // const navHeight = document.querySelector(`.${navStyles.Nav}`).clientHeight;
        // setX(e.pageX / imgRef.current.offsetWidth);
        // setY((e.pageY - navHeight) / imgRef.current.offsetHeight);
        setX(e.pageX);
        setY(e.pageY);

        console.log(`Clicked on [${x}, ${y}]`);
    };

    return (
        <div className={styles.Game}>
            <SelectMenu selectedX={x} selectedY={y} wasClicked={clicked} />
            <img ref={imgRef} onClick={updateCoords} className={styles.mainImage} src="https://i.imgur.com/EYt8S8f.png" alt="keebtown poster" />
        </div>
    );
}

export default Game;