const Pool = require('pg').Pool;

const pool = new Poool({
    host:'localhost',
    user:'postgres',
    password:'postgres',
    database:'MIMIC',
    max:20,
    port:5432, 
});