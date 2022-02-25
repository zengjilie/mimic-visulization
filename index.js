const { resolveInclude } = require("ejs");
const express = require("express");
const { RowDescriptionMessage } = require("pg-protocol/dist/messages");
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

app.get("/ethnicity", async (req, res) => {
    try {
        //request ethnicity data
        const ethnicityData = await pool.query(
            "SELECT ethnicity FROM admissions"
        );

        const map = new Map();

        ethnicityData.rows.forEach((entry) => {
            const key = entry.ethnicity;
            if (map.has(key)) {
                map.set(key, map.get(key) + 1);
            } else if (key != null) {
                map.set(key, 1);
            }
        });

		const data = [];

        for (let [key, value] of map) {
            data.push({ key, value });
        }

        res.render("ethnicity", { data:JSON.stringify(data) });
    } catch (err) {}
});

app.get("/religion", async (req, res) => {
    try {
        //request ethnicity data
        const religionData = await pool.query(
            "SELECT religion FROM admissions"
        );

        //hashmap record
        const map = new Map();

        religionData.rows.forEach((entry) => {
            const key = entry.religion;
            if (map.has(key)) {
                map.set(key, map.get(key) + 1);
            } else if (key != null) {
                map.set(key, 1);
            }
        });

        console.log(map);

        const data = [];

        for (let [key, value] of map) {
            data.push({ key, value });
        }

        res.render("religion", { data: JSON.stringify(data) });
    } catch (err) {
        console.log(err);
    }
});

app.get("/age", async (req, res) => {
    try {
        //reqest gender data
        const femaleAge = await pool.query(
            "SELECT (dod - dob)/365 AS age FROM patient WHERE gender = 'F'"
        );
        const maleAge = await pool.query(
            "SELECT (dod - dob)/365 AS age FROM patient WHERE gender = 'M'"
        );
		
		const femaleData = [];
		femaleAge.rows.forEach(entry =>{
			if(entry.age.days>=0 && entry.age.days <= 100)
			femaleData.push(entry.age.days);
		})
		const maleData = [];
		maleAge.rows.forEach(entry =>{
			if(entry.age.days>=0 && entry.age.days <= 100)
			maleData.push(entry.age.days);
		})

        res.render("age",{femaleData:JSON.stringify(femaleData), maleData:JSON.stringify(maleData)});

    } catch (err) {
        console.log(err);
    }
});

app.get("/insurance", async(req, res) => {
    try {
        //request ethnicity data
        const insuranceData = await pool.query(
            "SELECT insurance FROM admissions"
        );

        //hashmap record
        const map = new Map();

        insuranceData.rows.forEach((entry) => {
            const key = entry.insurance;
            if (map.has(key)) {
                map.set(key, map.get(key) + 1);
            } else if (key != null) {
                map.set(key, 1);
            }
        });

        console.log(map);

        const data = [];

        for (let [key, value] of map) {
            data.push({ name:key, value });
        }

		// res.json(map);
        res.render("insurance", { data: JSON.stringify(data) });
    } catch (err) {
        console.log(err);
    }
});

//port
app.listen(5000, () => {
    console.log("server running on port 5000");
});
