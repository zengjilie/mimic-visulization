const express = require('express');
const app = express();

//mw
app.use(express.json());

//routes
app.get('/', (req, res) => {
    res.sendFile('./view/index.html',{root:__dirname});
})

//port
app.listen(5000, () => {
    console.log("server running on port 5000");

})

