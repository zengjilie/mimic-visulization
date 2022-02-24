const express = require('express');
const app = express();
const pool = require('./db');

//mw
app.use(express.json());
app.use(express.static('public'));

//rendering engine
app.set('view engine','ejs');

//routes
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/gender', (req, res) => {
    res.render('gender');
})

app.get('/ethnicity', (req, res) => {
    res.render('ethnicity');
})

app.get('/religion', (req, res) => {
    res.render('religion');
})

app.get('/service', (req, res) => {
    res.render('service');
})

app.get('/eth_insur', (req, res) => {
    res.render('eth_insur');
})

//routes

app.get('/',async(req,res)=>{
    try{
       //request all the data that needs to be rendesed

        const data = await pool.query("SELECT * FROM patient");
        res.json(data);
    }catch(err){
        console.log(err);
    }
});

//port
app.listen(5000, () => {
    console.log("server running on port 5000");
})

