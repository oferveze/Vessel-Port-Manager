import React, { Fragment } from 'react'
import Table from '../Table/Table.js'
import AddVessel from '../AddVessel/AddVessel'
import Header from '../Header/Header'

function Layout() {

    return (
        <Fragment>
            <div className="frame">
                <Header />
                <AddVessel />
                <Table />
            </div>
        </Fragment>
    )
}

export default Layout;