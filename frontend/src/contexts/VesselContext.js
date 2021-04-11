import React, { createContext, useState, useEffect } from 'react';
import _ from 'underscore';
import {getAllVessels, postVessel, deleteVessel, putVessel} from '../fetch/vesselAPI';

export const VesselContext = createContext();

const VesselContextProvider = (props) => {
    const [vessels, setVessels] = useState([]);
    const [cannotAddVesselError, setCannotAddVesselError] = useState(null);

    useEffect(() => {
        getAndSetAllVessels();
    }, [])

    const getAndSetAllVessels = () => {
        return getAllVessels()
        .then(data => setVessels(data))
    }

    const addVessel = async (name) => {
        setCannotAddVesselError(null);
        try {
            const resp = await postVessel(name);
            console.log(resp);
            await getAndSetAllVessels();
        } catch (e) {
            console.log("Adding vessel went wrong: ", e);
            setCannotAddVesselError("Name should be unique");
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

    const handleMooredIntervalPairForVessel = (vessel) => {
        if (vessel.isMoored) {
            vessel.timeIntervalsInTorruga[vessel.timeIntervalsInTorruga.length - 1].end = Date.now();    
        } else {
            const intervalPair = {
                start: Date.now(),
                end: null
            }
            vessel.timeIntervalsInTorruga.push(intervalPair)    
        }
    }

    const toggleIsMoored = async (id) => {
        const vessel = _.findWhere(vessels, { id });
        handleMooredIntervalPairForVessel(vessel);
        vessel.isMoored = !vessel.isMoored;

        try {
            await putVessel(id, vessel);
            await getAndSetAllVessels();
        } catch (e) {
            console.log("Cannot toggle", e);
        }
    }

    return (
        <VesselContext.Provider value={{vessels, setVessels, addVessel, removeVessel, toggleIsMoored, cannotAddVesselError}}>
            { props.children }
        </VesselContext.Provider>
    );
}

export default VesselContextProvider;