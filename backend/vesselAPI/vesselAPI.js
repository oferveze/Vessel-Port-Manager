"use strict";

const express = require("express");
const router = express.Router();

const DEBUG = process.env.DEBUG;

const dbLike = require("../vesselsProvider/vesselsProvider");

const vesselProvider = new dbLike(DEBUG);

router.get('/', (_req, res) => {
    try {
        const ret = vesselProvider.getAll();
        res.send(ret);
    } catch (error) {
        res.statusCode = 500;
        res.send({error: error.message});
    }
});

router.get('/:id', (req, res) => {
    try {
        const ret = vesselProvider.getById(req.params.id);
        res.send(ret);
    } catch (error) {
        res.statusCode = 500;
        res.send({error: error.message});
    }
});

router.post('/', (req, res) => {
    try {
        const ret = vesselProvider.create(req.body.vesselName);
        res.statusCode=201;
        res.send(ret);
    } catch (error) {
        res.statusCode = 500;
        res.send({error: error.message});
    }
});

router.put('/:id', (req, res) => {
    try {
        const ret = vesselProvider.update(parseInt(req.params.id), req.body.vessel);
        res.send(ret);
    } catch (error) {
        res.statusCode = 500;
        res.send({error: error.message});
    }
});

router.delete('/:id', (req, res) => {
    try {
        vesselProvider.delete(parseInt(req.params.id));
        res.statusCode=204;
        res.send();
    } catch (error) {
        res.statusCode = 500;
        res.send({error: error.message});
    }
});

module.exports = router;