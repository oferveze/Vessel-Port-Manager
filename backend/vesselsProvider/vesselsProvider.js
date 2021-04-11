"use strict";
const _ = require("underscore");

module.exports = class vesselProvider {
    constructor(isDebug) {
        this.isDebug = isDebug;
        this.vessels = [];
        this.vesselIncId = 1;

        if(isDebug) {
            console.log("Vessel Provider created");
        }
    }

    getAll() {
        if (this.isDebug) {
            console.log("Get All Vessels");
            console.log(JSON.stringify(this.vessels));
        }
    
        return this.vessels;
    }

    getById(id) {
        const ret = _.findWhere(this.vessels, {id: id});
        
        if (this.isDebug) {
            console.log(`Get By Id : ${id}. ret: `, JSON.stringify(ret));
        }

        return ret;
    }

    create(vesselName) {
        
        if (!this.validateUniqueName(vesselName)) {
            console.log("Name should be unique");
            throw new Error("Name is already in use");
        }
        

        const newVessel = {};

        newVessel.id = this.vesselIncId++;
        newVessel.name = vesselName;
        newVessel.timeIntervalsInTorruga = [];
        newVessel.isMoored = false;

        if (this.isDebug) {
            console.log("Creating Vessel: ", JSON.stringify(newVessel));
        }

        this.vessels.push(newVessel);
        return newVessel;
    }

    update(id, newVessel) {
        if (this.isDebug) {
            console.log("Updating vessel: ", JSON.stringify(newVessel));
        }
        
        const index = _.findIndex(this.vessels, (vessel) => {
            return vessel.id === id;
        });

        this.vessels[index] = {
            id: newVessel.id,
            name: newVessel.name,
            timeIntervalsInTorruga: newVessel.timeIntervalsInTorruga,
            isMoored: newVessel.isMoored
        };
    }

    delete(id) {
        if (this.isDebug) {
            console.log("Deleting Vessel ID: ", id);
        }

        this.vessels = _.filter(this.vessels, vessel => vessel.id !== id);
    }

    validateUniqueName(vesselName) {
        vesselName.trim();
        const isFound = _.findWhere(this.vessels, {name: vesselName});
    
        return isFound === undefined;
    }
}
