"use strict";

const path = require("node:path");
const sqlite3 = require("sqlite3").verbose();

const databasePath = path.resolve(__dirname, "library.db");
const db = new sqlite3.Database(databasePath);

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        db.run(
            `CREATE TABLE IF NOT EXISTS students (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                department TEXT NOT NULL
            )`,
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                console.log(`SQLite connected (${databasePath})`);
                resolve();
            }
        );
    });
}

module.exports = { db, initializeDatabase };
