import React from 'react'
import Table from '../Table/Table.js'
import AddVessel from '../AddVessel/AddVessel'
import Header from '../Header/Header'

function Layout() {

    return (
        <div className="frame">
            <Header />
            <AddVessel />
            <Table />
        </div>
    )
}

export default Layout;