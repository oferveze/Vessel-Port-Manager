import React, { useState, useEffect } from 'react'
import prettyMs from 'pretty-ms'

import Actions from '../Actions/Actions'

function Vessel({ vessel }) {
    const [duration, setDuration] = useState(0);
    const [intervalId, setIntervalId] = useState()
    
    useEffect(() => {
        setDuration(getTotalDuration());

        return () => stopAndClearIntervalId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const startInterval = () => {
        const intervalId = setInterval(() => {
            const totalDuration = getTotalDuration();
            setDuration(totalDuration);
        }, 1000);

        setIntervalId(intervalId);
    };

    const stopAndClearIntervalId = () => {
        clearInterval(intervalId);
        setIntervalId(null);
    };

    useEffect(() => {
        if(vessel.isMoored) {
            startInterval();
        } else {
            stopAndClearIntervalId();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vessel.isMoored])

    const getTotalDuration = () => {
        let totalDuration = 0;
        vessel.timeIntervalsInTorruga.forEach(intervalPair => {
            const currEnd = intervalPair.end === null ? Date.now() : intervalPair.end
            const currStart = intervalPair.start;
            const currentDuration = currEnd - currStart;
            totalDuration += currentDuration;
        });

        return prettyMs(totalDuration);
    }

    return (
        <tr>
            <td>{vessel.name}</td>
            <td>{vessel.isMoored ? "Yes" : "No"}</td>
            <td>{duration}</td>
            <td><Actions id={vessel.id} isMoored={vessel.isMoored}/></td>
        </tr>
    )
}

export default Vessel;
