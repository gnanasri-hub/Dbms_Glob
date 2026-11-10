"use strict";

const path = require("node:path");
const sqlite3 = require("sqlite3").verbose();

const databasePath = path.resolve(__dirname, "library.db");
const db = new sqlite3.Database(databasePath);

function initializeDatabase() {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(
                `CREATE TABLE IF NOT EXISTS students (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id TEXT NOT NULL UNIQUE,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    department TEXT NOT NULL
                )`,
                (createError) => {
                    if (createError) {
                        reject(createError);
                        return;
                    }

                    db.all("PRAGMA table_info(students)", [], (pragmaError, columns) => {
                        if (pragmaError) {
                            reject(pragmaError);
                            return;
                        }

                        const migrateStudentIds = () => {
                            db.all(
                                "SELECT id FROM students WHERE student_id IS NULL OR TRIM(student_id) = ''",
                                [],
                                (selectError, rows) => {
                                    if (selectError) {
                                        reject(selectError);
                                        return;
                                    }

                                    const updateNext = (index) => {
                                        if (index === rows.length) {
                                            db.run(
                                                "CREATE UNIQUE INDEX IF NOT EXISTS idx_students_student_id ON students(student_id)",
                                                (indexError) => {
                                                    if (indexError) {
                                                        reject(indexError);
                                                        return;
                                                    }

                                                    console.log(`SQLite connected (${databasePath})`);
                                                    resolve();
                                                }
                                            );
                                            return;
                                        }

                                        const { id } = rows[index];
                                        const studentId = `STU${String(id).padStart(3, "0")}`;
                                        db.run(
                                            "UPDATE students SET student_id = ? WHERE id = ?",
                                            [studentId, id],
                                            (updateError) => {
                                                if (updateError) {
                                                    reject(updateError);
                                                    return;
                                                }
                                                updateNext(index + 1);
                                            }
                                        );
                                    };

                                    updateNext(0);
                                }
                            );
                        };

                        if (columns.some((column) => column.name === "student_id")) {
                            migrateStudentIds();
                            return;
                        }

                        db.run("ALTER TABLE students ADD COLUMN student_id TEXT", (alterError) => {
                            if (alterError) {
                                reject(alterError);
                                return;
                            }
                            migrateStudentIds();
                        });
                    });
                }
            );
        });
    });
}

module.exports = { db, initializeDatabase };
