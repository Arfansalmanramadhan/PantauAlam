require('dotenv').config();
const express = require('express');
const cors = require('cors');

const port = 5000;
const app = express();
app.use(cors());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});