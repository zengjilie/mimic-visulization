# MIMIC Data Visulization

## Demo Video

[Click to See](https://youtu.be/124ah_uCnQM)

## Tech Stack

-   Front End: JavaScript, HTML/SCSS, [Apache ECharts](https://echarts.apache.org/zh/index.html)
-   Back End: NodeJS, ExpressJS, [EJS](https://ejs.co/)
-   Database: [PostgreSQL](https://www.postgresql.org/)

## Content

-   Gender distribution
-   Enthnicity distribution
-   Religion distribution
-   Age distribution by Gender
-   Insurance distribution

-   timeline 
## Usage

In order to run this repo on your local machine, you need to install [PostgreSQL](https://www.postgresql.org/) first.

Here are some tutorials on how to install PostgreSQL on your computer

-   Linux -> https://www.youtube.com/watch?v=-LwI4HMR_Eg&t=383s
-   Mac -> https://www.youtube.com/watch?v=-Dux6hnmWNE
-   Windows -> https://www.youtube.com/watch?v=BLH3s5eTL4Y

After you installed PostgreSQL, you need to use a GUI(Graphical Uesr Interface) to interact with PostgreSQL, I recommand using [PGAdmin](https://www.pgadmin.org/).

After you installed PGAdmin, you can start to import the MIMIC Demo III data on this website -> https://physionet.org/content/mimiciii-demo/1.4

The csv files I used are `admission.csv` and `patient.csv`, you need to create a database named `MIMIC`, then create two tables, one is called `admissions`, the other one is called `patient` import these two csv files to your PostgreSQL database.

You can watch this tutorial on how to import csv files to PostgreSQL database table ->
https://www.youtube.com/watch?v=DMl5fsc8PSk&t=378s

After you successfully setup the database, you can `git clone` this project and ready to use it.

After you cloned this project into your local folder, you can run.

`npm install ` this should install all the node_modules you need.

`npm run start` this should start the project using [nodemon](https://www.npmjs.com/package/nodemon) listening to port 5000.

Go to `localhost:5000`, you can play around with this project.
