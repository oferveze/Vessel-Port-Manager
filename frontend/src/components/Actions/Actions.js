import React, { useContext } from 'react'
import { VesselContext } from '../../contexts/VesselContext'

function Actions({ id, isMoored }) {
    const { removeVessel, toggleIsMoored } = useContext(VesselContext);

    return (
        <>
           {isMoored ? 
                <button onClick={() => toggleIsMoored(id)}>Leave Port</button> :
                <button onClick={() => toggleIsMoored(id)}>Enter Port</button>
           }
            <button onClick={() => removeVessel(id)}>Delete</button>
        </>
    )
}

export default Actions;