import React, { useState, useContext } from 'react'
import { VesselContext } from '../../contexts/VesselContext';
import Vessel from '../Vessel/Vessel'

function Table() {
    const { vessels } = useContext(VesselContext)
    const [filterBy, setFilterBy] = useState("");
   
    const onChange = (event) => {
        setFilterBy(event.target.value);
    }

    return (
        <div  className="frame">
            <div>
                <input value={filterBy} type="text" onChange={onChange} placeholder="Type to filter..."/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Moored</th>
                        <th>Total Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vessels
                    .filter(vessel => vessel.name.includes(filterBy))
                    .map((vessel) => <Vessel vessel={vessel} key={vessel.id} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Table;