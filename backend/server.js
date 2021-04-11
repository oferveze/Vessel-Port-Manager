"use strict";

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const vesselAPI = require("./vesselAPI/vesselAPI");

app.use(express.json());
app.use('/vessels', vesselAPI);

app.get('/', (req, res) => {
  res.send("Backend is ready");
});

app.listen(port, () => {
  console.log(`Backend is listening at http://localhost:${port}`)
});