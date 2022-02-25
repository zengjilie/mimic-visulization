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

app.get("/ethnicity", async (req, res) => {
    try {
        //request ethnicity data
        const ethnicityData = await pool.query(
            "SELECT ethnicity FROM admissions"
        );

        //count data
        let whiteNum = 0;
        let asianNum = 0;
        let blackNum = 0;
        let unknowNum = 0;
        let otherNum = 0;
        let hispanicNum = 0;
        let puertoricanNum = 0;
        let indianNum = 0;
        let unableToObtainNum = 0;

        ethnicityData.rows.forEach((entry) => {
            switch (entry.ethnicity) {
                case "WHITE":
                    whiteNum++;
					break;
                case "ASIAN":
                    asianNum++;
					break;
                case "BLACK/AFRICAN AMERICAN":
                    blackNum++;
					break;
                case "UNKNOWN/NOT SPECIFIED":
                    unknowNum++;
					break;
                case "OTHER":
                    otherNum++;
					break;
                case "HISPANIC OR LATINO":
                    hispanicNum++;
					break;
                case "HISPANIC/LATINO - PUERTO RICAN":
                    puertoricanNum++;
					break;
                case "AMERICAN INDIAN/ALASKA NATIVE FEDERALLY RECOGNIZED TRIBE":
                    indianNum++;
					break;
                case "UNABLE TO OBTAIN":
                    unableToObtainNum++;
					break;
				default:
					break;
            }
        });

		const data = {
			white:whiteNum,
			asian:asianNum,
			black:blackNum,
			unknown: unknowNum,
			other: otherNum,
			hispanic: hispanicNum,
			puertorican: puertoricanNum,
			indian: indianNum,
			unable: unableToObtainNum
		}

        res.render("ethnicity",{data});
    } catch (err) {}
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
