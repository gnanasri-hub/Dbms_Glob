"use strict";

const form = document.getElementById("studentForm");
const addStudentView = document.getElementById("addStudentView");
const studentListView = document.getElementById("studentListView");
const studentTableBody = document.getElementById("studentTableBody");
const studentSearch = document.getElementById("studentSearch");
const backButton = document.getElementById("backButton");
const viewStudentsButton = document.getElementById("viewStudentsButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const submitStudentButton = document.getElementById("submitStudentButton");
const addStudentHeading = document.getElementById("addStudentHeading");
const statusMessage = document.getElementById("statusMessage");
let students = [];
let editingStudentId = null;

function showStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.classList.toggle("error", isError);
}

async function request(path, options = {}) {
    const response = await fetch(path, options);
    const contentType = response.headers.get("Content-Type") || "";
    const body = await response.text();
    let data = null;

    if (body) {
        if (contentType.includes("application/json")) {
            try {
                data = JSON.parse(body);
            } catch {
                throw new Error(`The server returned an invalid response (${response.status}).`);
            }
        } else {
            data = body;
        }
    }

    if (!response.ok) {
        if (data && typeof data === "object" && typeof data.error === "string") {
            throw new Error(data.error);
        }

        throw new Error(`Request failed (${response.status}).`);
    }

    return data;
}

function renderStudents() {
    const query = studentSearch.value.trim().toLocaleLowerCase();
    const filteredStudents = students.filter((student) =>
        [student.name, student.email, student.department]
            .some((value) => String(value).toLocaleLowerCase().includes(query))
    );

    studentTableBody.replaceChildren();

    if (filteredStudents.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 5;
        cell.className = "emptyMessage";
        cell.textContent = "No students found";
        row.appendChild(cell);
        studentTableBody.appendChild(row);
        return;
    }

    filteredStudents.forEach((student) => {
        const row = document.createElement("tr");
        const idCell = document.createElement("td");
        const nameCell = document.createElement("td");
        const emailCell = document.createElement("td");
        const departmentCell = document.createElement("td");
        const actionsCell = document.createElement("td");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        idCell.textContent = student.id;
        nameCell.textContent = student.name;
        emailCell.textContent = student.email;
        departmentCell.textContent = student.department;
        editButton.type = "button";
        editButton.className = "editButton";
        editButton.textContent = "Edit";
        editButton.setAttribute("aria-label", `Edit ${student.name}`);
        editButton.addEventListener("click", () => editStudent(student));
        deleteButton.type = "button";
        deleteButton.className = "deleteButton";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", `Delete ${student.name}`);
        deleteButton.addEventListener("click", () => deleteStudent(student.id, deleteButton));
        actionsCell.append(editButton, deleteButton);
        row.append(idCell, nameCell, emailCell, departmentCell, actionsCell);
        studentTableBody.appendChild(row);
    });
}

async function loadStudents() {
    const result = await request("/students");
    if (!Array.isArray(result)) {
        throw new Error("The server returned an invalid student list.");
    }

    students = result;
    renderStudents();
}

function openStudentList() {
    addStudentView.hidden = true;
    studentListView.hidden = false;
    studentSearch.focus();
}

function showLoadingMessage() {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.className = "emptyMessage";
    cell.textContent = "Loading students...";
    row.appendChild(cell);
    studentTableBody.replaceChildren(row);
}

async function viewStudents() {
    openStudentList();
    showLoadingMessage();

    try {
        await loadStudents();
        showStatus("");
    } catch (error) {
        renderStudents();
        showStatus(`Unable to load students: ${error.message}`, true);
    }
}

function openAddStudent() {
    studentListView.hidden = true;
    addStudentView.hidden = false;
    showStatus("");
    document.getElementById("name").focus();
}

function resetEditMode() {
    editingStudentId = null;
    addStudentHeading.textContent = "Add a student";
    submitStudentButton.textContent = "Add Student";
    cancelEditButton.hidden = true;
    viewStudentsButton.hidden = false;
}

function editStudent(student) {
    editingStudentId = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("department").value = student.department;
    addStudentHeading.textContent = "Edit student";
    submitStudentButton.textContent = "Update Student";
    cancelEditButton.hidden = false;
    viewStudentsButton.hidden = true;
    studentListView.hidden = true;
    addStudentView.hidden = false;
    showStatus("");
    document.getElementById("name").focus();
}

function cancelEdit() {
    form.reset();
    resetEditMode();
    openStudentList();
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value
    };

    const isEditing = editingStudentId !== null;
    submitStudentButton.disabled = true;
    showStatus(isEditing ? "Updating student..." : "Adding student...");

    try {
        const path = isEditing
            ? `/students/${encodeURIComponent(editingStudentId)}`
            : "/students";
        await request(path, {
            method: isEditing ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)
        });
        form.reset();
        resetEditMode();
        studentSearch.value = "";
        openStudentList();

        try {
            await loadStudents();
            showStatus(isEditing ? "Student updated." : "Student added.");
        } catch (error) {
            const action = isEditing ? "updated" : "added";
            showStatus(`Student ${action}, but the list could not be loaded: ${error.message}`, true);
        }
    } catch (error) {
        const action = isEditing ? "update" : "add";
        showStatus(`Unable to ${action} student: ${error.message}`, true);
    } finally {
        submitStudentButton.disabled = false;
    }
});

async function deleteStudent(id, button) {
    button.disabled = true;
    showStatus("Deleting student...");

    try {
        await request(`/students/${encodeURIComponent(id)}`, { method: "DELETE" });
        students = students.filter((student) => String(student.id) !== String(id));
        renderStudents();
        showStatus("Student deleted.");
    } catch (error) {
        showStatus(`Unable to delete student: ${error.message}`, true);
        button.disabled = false;
    }
}

studentSearch.addEventListener("input", renderStudents);
backButton.addEventListener("click", openAddStudent);
viewStudentsButton.addEventListener("click", viewStudents);
cancelEditButton.addEventListener("click", cancelEdit);
