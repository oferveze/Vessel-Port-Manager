import React, { useContext } from 'react'
import { VesselContext } from '../../contexts/VesselContext'

function Actions({ id, isMoored }) {
    const { removeVessel, toggleIsMoored } = useContext(VesselContext);

    return (
        <>
            <button onClick={() => toggleIsMoored(id)}>{isMoored ? "Leave Port": "Enter Port"} </button>
            <button onClick={() => removeVessel(id)}>Delete</button>
        </>
    )
}

export default Actions;