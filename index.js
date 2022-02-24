const express = require('express');
const app = express();
const pool = require('./db');

//mw
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.sendFile('./view/index.html',{root:__dirname});
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

