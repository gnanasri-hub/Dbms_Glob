"use strict";

const path = require("node:path");
const express = require("express");
const { db, initializeDatabase } = require("./db");

const app = express();
const frontendPath = path.resolve(__dirname, "..", "frontend");
const indexPath = path.join(frontendPath, "index.html");
const port = Number(process.env.PORT) || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(indexPath);
});

app.get("/students", (req, res) => {
    db.all(
        "SELECT id, student_id AS studentId, name, email, department FROM students ORDER BY id ASC",
        [],
        (error, rows) => {
            if (error) {
                console.error("Failed to load students:", error);
                res.status(500).json({ error: "Failed to load students." });
                return;
            }

            res.json(rows);
        }
    );
});

app.post("/students/import", (req, res) => {
    const records = req.body?.students;
    if (!Array.isArray(records)) {
        res.status(400).json({ error: "Students must be provided as an array." });
        return;
    }

    const students = records.map((record) => {
        if (!record || typeof record !== "object" || Array.isArray(record)) {
            return null;
        }

        const values = [record.studentId, record.name, record.email, record.department];
        if (values.some((value) => typeof value !== "string" || value.trim().length === 0)) {
            return null;
        }
        return values.map((value) => value.trim());
    });

    if (students.some((student) => student === null)) {
        res.status(400).json({
            error: "Every student must include a Student ID, name, email, and department."
        });
        return;
    }

    if (students.length === 0) {
        res.json({ inserted: 0 });
        return;
    }

    const placeholders = students.map(() => "(?, ?, ?, ?)").join(", ");
    const values = students.flat();
    db.run(
        `INSERT OR IGNORE INTO students (student_id, name, email, department) VALUES ${placeholders}`,
        values,
        function (error) {
            if (error) {
                console.error("Failed to import students:", error);
                res.status(500).json({ error: "Failed to import students." });
                return;
            }

            res.json({ inserted: this.changes });
        }
    );
});

app.post("/students", (req, res) => {
    const { studentId, name, email, department } = req.body ?? {};
    const student = [studentId, name, email, department].map((value) =>
        typeof value === "string" ? value.trim() : ""
    );

    if (student.some((value) => value.length === 0)) {
        res.status(400).json({
            error: "Student ID, name, email, and department are required."
        });
        return;
    }

    db.run(
        "INSERT INTO students (student_id, name, email, department) VALUES (?, ?, ?, ?)",
        student,
        function (error) {
            if (error) {
                if (error.code === "SQLITE_CONSTRAINT" && error.message.includes("student_id")) {
                    res.status(409).json({
                        error: "Student ID already exists. Please use a unique Student ID."
                    });
                    return;
                }

                console.error("Failed to create student:", error);
                res.status(500).json({ error: "Failed to create student." });
                return;
            }

            res.status(201).json({
                id: this.lastID,
                studentId: student[0],
                name: student[1],
                email: student[2],
                department: student[3]
            });
        }
    );
});

app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
        res.status(400).json({ error: "Student ID must be a positive integer." });
        return;
    }

    const { studentId, name, email, department } = req.body ?? {};
    const student = [studentId, name, email, department].map((value) =>
        typeof value === "string" ? value.trim() : ""
    );

    if (student.some((value) => value.length === 0)) {
        res.status(400).json({
            error: "Student ID, name, email, and department are required."
        });
        return;
    }

    db.run(
        "UPDATE students SET student_id = ?, name = ?, email = ?, department = ? WHERE id = ?",
        [...student, id],
        function (error) {
            if (error) {
                if (error.code === "SQLITE_CONSTRAINT" && error.message.includes("student_id")) {
                    res.status(409).json({
                        error: "Student ID already exists. Please use a unique Student ID."
                    });
                    return;
                }

                console.error("Failed to update student:", error);
                res.status(500).json({ error: "Failed to update student." });
                return;
            }

            if (this.changes === 0) {
                res.status(404).json({ error: "Student not found." });
                return;
            }

            res.json({
                id,
                studentId: student[0],
                name: student[1],
                email: student[2],
                department: student[3]
            });
        }
    );
});

app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
        res.status(400).json({ error: "Student ID must be a positive integer." });
        return;
    }

    db.run("DELETE FROM students WHERE id = ?", [id], function (error) {
        if (error) {
            console.error("Failed to delete student:", error);
            res.status(500).json({ error: "Failed to delete student." });
            return;
        }

        if (this.changes === 0) {
            res.status(404).json({ error: "Student not found." });
            return;
        }

        res.json({ message: "Student deleted." });
    });
});

app.use(express.static(frontendPath, { index: false }));

app.use((error, req, res, next) => {
    console.error("Request failed:", error);
    if (res.headersSent) {
        next(error);
        return;
    }

    res.status(error.status || 500).json({
        error: error.status === 400 ? "Invalid JSON request body." : "Internal server error."
    });
});

if (require.main === module) {
    initializeDatabase()
        .then(() => {
            app.listen(port, () => {
                console.log(`Library Management System running at http://localhost:${port}`);
            });
        })
        .catch((error) => {
            console.error("Failed to initialize SQLite:", error);
            process.exitCode = 1;
        });
}

module.exports = app;
