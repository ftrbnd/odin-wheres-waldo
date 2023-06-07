import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Game.module.css';
import SelectMenu from './SelectMenu';
import { Slide, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import TargetsModal from './modals/TargetsModal';
import useTimer from '../utils/useTimer';
import GameEndModal from './modals/GameEndModal';
import PreGameModal from './modals/PreGameModal';
import Footer from './Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebase';

const Game = () => {
    const [x, setX] = useState(-1);
    const [y, setY] = useState(-1);
    const [clicked, setClicked] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [markers, setMarkers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [targets, setTargets] = useState([]);
    
    const coords = useRef([]);
    const imgRef = useRef();

    const { minutes, seconds } = useTimer(startTimer);

    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) navigate('/');

        async function fetchTargets() {
            const data = [];

            const querySnapshot = await getDocs(collection(firestore, 'targets'));
            querySnapshot.forEach(doc => {
                if (doc.id === state.image.id) {
                    for (const [key, value] of Object.entries(doc.data()))
                        data.push([key, value])
                }
            });

            return data;
        };
        
        fetchTargets().then(data => { 
            setTargets(data);
            console.log(`Targets for ${state.image.name}: `, data);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const updateCoords = (e) => {
        setClicked(true);

        coords.current = [e.pageX, e.pageY];
        // prevent menu from going off-screen on edges
        imgRef.current.offsetWidth - e.pageX < 144 ? setX(e.pageX - 144) : setX(e.pageX);
        imgRef.current.offsetHeight - e.pageY < 143 ? setY(e.pageY - 143) : setY(e.pageY);

        console.log(`Clicked on [${x}, ${y}]`);
    };

    const handleCorrectGuess = (target) => {
        setCorrectCount(prevCount => {
            const newCount = prevCount + 1;

            if (newCount === 3)
                setGameEnd(true);

            return newCount;
        });

        notify(`Found ${displayTargetName(target)}!`, true);
        setMarkers(markers => [...markers, [x, y]]); // note: will be off to the left on targets near the edges
    };

    const handleWrongGuess = (target) => {
        notify(`This is not ${displayTargetName(target)}...`, false);
    };

    const handleDuplicateGuess = (target) => {
        notify(`You already selected ${displayTargetName(target)}!`, false);
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

    const displayTargetName = (targetId) => {
        switch (targetId) {
            case 'spiderMan':
                return 'Spider-Man';
            case 'spiderManMiles':
                return 'Spider-Man (Miles Morales)';
            case 'spiderWoman':
                return 'Spider-Woman';
            default:
                return 'Unknown Target';
        }
    };

    return (
        <div className={styles.Game}>
            <SelectMenu xPosition={x} yPosition={y} wasClicked={clicked} offsetWidth={imgRef.current?.offsetWidth} offsetHeight={imgRef.current?.offsetHeight} coords={coords} onCorrectGuess={handleCorrectGuess} onWrongGuess={handleWrongGuess} onDuplicateGuess={handleDuplicateGuess} targets={targets} displayName={displayTargetName} />
            {
                markers.map(marker => {
                    return <FontAwesomeIcon key={`${marker[0]}-${marker[1]}`} icon={faLocationPin} beat size="2xl" style={{ color: "#90ee90", position: 'absolute', top: `${marker[1]}px`, left: `${marker[0]}px` }} />
                })
            }
            <div className={styles.info}>
                <p>{correctCount} / 3</p>
                <p>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
                <p onClick={() => setShowModal(true)} className={styles.openModal}>Targets</p>
            </div>
            {!startTimer && <PreGameModal onClose={() => setStartTimer(true)} targets={targets} displayName={displayTargetName} />}
            {showModal && <TargetsModal onClose={() => setShowModal(false)} targets={targets} displayName={displayTargetName} />}
            {gameEnd && <GameEndModal minutes={minutes} seconds={seconds} imageName={state.image.name} />}
            {state && <img ref={imgRef} onClick={updateCoords} className={styles.mainImage} src={state.image.link} alt={state.image.name} />}
            <Footer />
        </div>
    );
}

export default Game;