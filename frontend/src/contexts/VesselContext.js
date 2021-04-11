import React, { createContext, useState, useEffect } from 'react';
import _ from 'underscore';
import {getAllVessels, postVessel, deleteVessel, putVessel} from '../fetch/vesselAPI';

export const VesselContext = createContext();

const VesselContextProvider = (props) => {
    const [vessels, setVessels] = useState([]);

    useEffect(() => {
        getAndSetAllVessels();
    }, [])

    const getAndSetAllVessels = () => {
        return getAllVessels()
        .then(data => setVessels(data))
    }

    const addVessel = async (name) => {
        try {
            await postVessel(name);
            await getAndSetAllVessels();
        } catch (e) {
            console.log("Adding vessel went wrong: ", e);
        }
    }

    const removeVessel = async (id) => {
        try {
            await deleteVessel(id);
            await getAndSetAllVessels();
        } catch (e) {
            console.log("Deleting vessel went wrong: ", e);
        }
    }

    const toggleIsMoored = async (id) => {
        const vessel = _.findWhere(vessels, { id });
        
        if (vessel.isMoored) {
            vessel.timeIntervalsInTorruga[vessel.timeIntervalsInTorruga.length - 1].end = Date.now();    
        } else {
            const intervalPair = {
                start: Date.now(),
                end: null
            }
            vessel.timeIntervalsInTorruga.push(intervalPair)    
        }

        vessel.isMoored = !vessel.isMoored;

        try {
            await putVessel(id, vessel);
            await getAndSetAllVessels();
        } catch (e) {
            console.log("Cannot toggle", e);
        }
    }

    return (
        <VesselContext.Provider value={{vessels, setVessels, addVessel, removeVessel, toggleIsMoored }}>
            { props.children }
        </VesselContext.Provider>
    );
}

export default VesselContextProvider;