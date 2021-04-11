import React, { useState, useContext } from 'react'
import { VesselContext } from '../../contexts/VesselContext';

function AddVessel() {
    const [newVesselName, setNewVesselName] = useState("")
    const { addVessel, cannotAddVesselError } = useContext(VesselContext)

    const onChange = (event) => {
        event.preventDefault();
        setNewVesselName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        addVessel(newVesselName);
        setNewVesselName("");
    }
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <label>
                    <input type="text" value={newVesselName} onChange={onChange} required placeholder="Vessel Name"/>
                </label>
                <input type="submit" value="Add Vessel" />
            </form>
            {cannotAddVesselError ? <span className="errorMsg">{cannotAddVesselError}</span> : null}
        </>
    )
}

export default AddVessel;