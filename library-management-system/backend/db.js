const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./library.db", (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("SQLite Connected");
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        department TEXT
    )
`);

module.exports = db;