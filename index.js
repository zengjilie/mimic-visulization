const express = require("express");
const app = express();
const pool = require("./db");

//mw
app.use(express.json());
app.use(express.static("public"));

//rendering engine
app.set("view engine", "ejs");

//routes
app.get("/", async (req, res) => {
    try {
        //reqest gender data
        const data = await pool.query("SELECT * FROM patient");
        console.log(data);
        res.json(data);
    } catch (err) {
        console.log(err);
    }
    res.render("index");
});

app.get("/gender", (req, res) => {
    try {
        // request gender distribution data
        // const data = await pool.query("SELECT * FROM patient");
        // console.log(data);
        const data = 0;
        res.render("gender", { data });
    } catch (err) {
        console.log(err);
    }
});

app.get("/ethnicity", (req, res) => {
    res.render("ethnicity");
});

app.get("/religion", (req, res) => {
    res.render("religion");
});

app.get("/service", (req, res) => {
    res.render("service");
});

app.get("/eth_insur", (req, res) => {
    res.render("eth_insur");
});

//port
app.listen(5000, () => {
    console.log("server running on port 5000");
});
