const express = require('express');
const app = express();

//mw
app.use(express.json());


//port
app.listen(5000, () =>{
    console.log("server running on port 5000");
    
})

