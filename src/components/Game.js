import React, { useRef, useState } from 'react';
import styles from '../styles/Game.module.css';
import SelectMenu from './SelectMenu';
import { Slide, toast } from 'react-toastify';

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
        // make sure clicking on a previously guessed character doesn't update correctCount

        notify(`Found ${target}!`, true);

        // add to leaderboard on game end
    };

    const handleWrongGuess = (target) => {
        notify(`This is not ${target}...`, false);
    };

    const notify = (text, correctGuess) => {
        toast(text, {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            transition: Slide,
            draggablePercent: 60,
            style: {
                backgroundColor: `${correctGuess ? 'lightgreen' : 'lightcoral'}`,
                color: `${correctGuess ? 'gray' : 'white'}`
            }
        });
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