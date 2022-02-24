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
    res.render("index");
});

app.get("/gender", async (req, res) => {
    try {
        //reqest gender data
        const femaleData = await pool.query(
            "SELECT * FROM patient WHERE gender = 'F' "
        );
        const maleData = await pool.query(
            "SELECT * FROM patient WHERE gender = 'M' "
        );
        const femaleNum = femaleData.rows.length;
        const maleNum = maleData.rows.length;
        res.render("gender", { femaleNum, maleNum });
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
