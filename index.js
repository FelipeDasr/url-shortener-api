if (process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

const express = require('express');
const router = require('./src/router');
const cors = require('cors');

const DBConnection = require('./src/database');

(async () => {
    try{
        await DBConnection.authenticate();  // CHECK DATABASE CONNECTION
        await DBConnection.sync();          // CREATE TABLES IF NOT EXISTS
        console.log('DATABASE OK');
    }
    catch(e){
        console.log('DATABASE ERROR:', e);
    }
})();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.API_PORT, () => {                                 // START API SERVICE
    console.clear();
    console.log('API RUNNING AT http://127.0.0.1:3000');
})