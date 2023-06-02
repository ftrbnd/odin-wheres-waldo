import { useState, useEffect } from "react";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const useTimer = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSec => prevSec + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return {
        days: Math.floor(seconds / DAY),
        hours: Math.floor((seconds / HOUR) % 24),
        minutes: Math.floor((seconds / MINUTE) % 60),
        seconds: seconds % 60
    };
}

export default useTimer;