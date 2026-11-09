const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Library Management API Running");
});

app.post("/students", (req, res) => {

    const { name, email, department } = req.body;

    db.run(
        "INSERT INTO students(name,email,department) VALUES(?,?,?)",
        [name, email, department],
        function (err) {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Student Added"
            });
        }
    );
});

app.get("/students", (req, res) => {

    db.all(
        "SELECT * FROM students",
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(rows);
        }
    );
});

app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});