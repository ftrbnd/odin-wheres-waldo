import React, { useRef, useState } from 'react';
import styles from '../styles/Game.module.css';
import SelectMenu from './SelectMenu';

const Game = () => {
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [clicked, setClicked] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    
    const coords = useRef([]);
    const imgRef = useRef();

    const updateCoords = (e) => {
        setClicked(true);

        coords.current = [e.pageX, e.pageY];
        // prevent menu from going off-screen on edges
        imgRef.current.offsetWidth - e.pageX < 144 ? setX(e.pageX - 144) : setX(e.pageX);
        imgRef.current.offsetHeight - e.pageY < 143 ? setY(e.pageY - 143) : setY(e.pageY);

        console.log(`Clicked on [${x}, ${y}]`);
    };

    const handleCorrectGuess = (target) => {
        setCorrectCount(prevCount => prevCount + 1);
        // hardcode limit of 3 or use firebase data length? - to check for game end
        // show popup
        // add to leaderboard on game end

        console.log(`Found ${target}!`);
        // display popup
    };

    const handleWrongGuess = (target) => {
        console.log(`This is not ${target}...`);
        // display popup
    };

    return (
        <div className={styles.Game}>
            <SelectMenu xPosition={x} yPosition={y} wasClicked={clicked} offsetWidth={imgRef.current?.offsetWidth} offsetHeight={imgRef.current?.offsetHeight} coords={coords} onCorrectGuess={handleCorrectGuess} onWrongGuess={handleWrongGuess} />
            <div className={styles.info}>
                <p>{correctCount} / 3</p>
                <p>timer</p>
                <p>targets list</p>
            </div>
            <img ref={imgRef} onClick={updateCoords} className={styles.mainImage} src="https://i.imgur.com/EYt8S8f.png" alt="keebtown poster" />
        </div>
    );
}

export default Game;