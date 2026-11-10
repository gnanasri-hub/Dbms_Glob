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
const studentsData = [
    { studentId: "25241A6601", name: "ALAMALAKALA DHEERAJ", email: "dheeraj@gmail.com", department: "AIML" },
    { studentId: "25241A6602", name: "TALLAMUDI ANANYA", email: "ananya@gmail.com", department: "AIML" },
    { studentId: "25241A6603", name: "ARPULA BALAJI", email: "balaji@gmail.com", department: "AIML" },
    { studentId: "25241A6604", name: "ATKAPURAM SHALINI", email: "shalini@gmail.com", department: "AIML" },
    { studentId: "25241A6605", name: "ATMAKUR VARSHITHA", email: "varshitha@gmail.com", department: "AIML" },
    { studentId: "25241A6606", name: "BANGI AKHILESH", email: "akhilesh@gmail.com", department: "AIML" },
    { studentId: "25241A6607", name: "BANOTH VIGNESH", email: "vignesh@gmail.com", department: "AIML" },
    { studentId: "25241A6608", name: "BODDUPALLI HAASITHA", email: "haasitha@gmail.com", department: "AIML" },
    { studentId: "25241A6609", name: "BOLNENI AASHISH RAO", email: "rao@gmail.com", department: "AIML" },
    { studentId: "25241A6610", name: "CHILUKURI NAGARAJU", email: "nagaraju@gmail.com", department: "AIML" },
    { studentId: "25241A6611", name: "DANDUGULA ASHRITHA", email: "ashritha@gmail.com", department: "AIML" },
    { studentId: "25241A6612", name: "DEVIREDDY SAMPREETHI", email: "sampreethi@gmail.com", department: "AIML" },
    { studentId: "25241A6613", name: "DODDA RAKSHITA", email: "rakshita@gmail.com", department: "AIML" },
    { studentId: "25241A6614", name: "DORNALA DHEERAJ", email: "dheeraj@gmail.com", department: "AIML" },
    { studentId: "25241A6615", name: "DUDDELA RAGH ASHWITHA", email: "ashwitha@gmail.com", department: "AIML" },
    { studentId: "25241A6616", name: "ELLITAM ASHRIT KISHOR", email: "kishor@gmail.com", department: "AIML" },
    { studentId: "25241A6617", name: "EPPALAPALLI PRANEETH", email: "praneeth@gmail.com", department: "AIML" },
    { studentId: "25241A6618", name: "GADDAM VINAY KUMAR", email: "kumar@gmail.com", department: "AIML" },
    { studentId: "25241A6619", name: "HIMANI NEGI", email: "negi@gmail.com", department: "AIML" },
    { studentId: "25241A6620", name: "JEEVAN TERMATI", email: "termati@gmail.com", department: "AIML" },
    { studentId: "25241A6621", name: "K SRINESH", email: "srinesh.k2621@gmail.com", department: "AIML" },
    { studentId: "25241A6622", name: "KALLE PREETHAM", email: "preetham.kalle2622@gmail.com", department: "AIML" },
    { studentId: "25241A6623", name: "KALVA HASINI", email: "hasini.kalva2623@gmail.com", department: "AIML" },
    { studentId: "25241A6624", name: "KAUSHIK DILIP RAUT", email: "raut.kaushik2624@gmail.com", department: "AIML" },
    { studentId: "25241A6625", name: "KOKKALLA SANTHOSH", email: "santhosh.kokkalla2625@gmail.com", department: "AIML" },
    { studentId: "25241A6626", name: "KONDURI SHARANYA", email: "sharanya.konduri2626@gmail.com", department: "AIML" },
    { studentId: "25241A6627", name: "KORVI ANEESHA", email: "aneesha.korvi2627@gmail.com", department: "AIML" },
    { studentId: "25241A6628", name: "KURAPATI CHARAN SAI KUMAR", email: "kumar.kurapati2628@gmail.com", department: "AIML" },
    { studentId: "25241A6629", name: "L SHIV KUMAR", email: "kumar.l2629@gmail.com", department: "AIML" },
    { studentId: "25241A6630", name: "LANKA ABHIRAM", email: "abhiram.lanka2630@gmail.com", department: "AIML" },
    { studentId: "25241A6631", name: "MAHANANDI PARDHA SARADHI REDDY", email: "reddy.mahanandi2631@gmail.com", department: "AIML" },
    { studentId: "25241A6632", name: "MAMIDI RAHUL", email: "rahul.mamidi2632@gmail.com", department: "AIML" },
    { studentId: "25241A6633", name: "MANCHIRYALA MANIKANTA", email: "manikanta.manchiryala2633@gmail.com", department: "AIML" },
    { studentId: "25241A6634", name: "MATTA DARSHAN", email: "darshan.matta2634@gmail.com", department: "AIML" },
    { studentId: "25241A6635", name: "MOHAMMAD HANEEF", email: "haneef.mohammad2635@gmail.com", department: "AIML" },
    { studentId: "25241A6636", name: "MUDAM SAHASRA", email: "sahasra.mudam2636@gmail.com", department: "AIML" },
    { studentId: "25241A6637", name: "MUHAMMAD KAMRAN AKMAL", email: "akmal.muhammad2637@gmail.com", department: "AIML" },
    { studentId: "25241A6638", name: "MURIKI AVINASH", email: "avinash.muriki2638@gmail.com", department: "AIML" },
    { studentId: "25241A6639", name: "NAGAPURI NEHA", email: "neha.nagapuri2639@gmail.com", department: "AIML" },
    { studentId: "25241A6640", name: "NAYAKWADI ROHITH", email: "rohith.nayakwadi2640@gmail.com", department: "AIML" },
    { studentId: "25241A6641", name: "NIMMAGADDA LAUTHHYA HARSHITHA", email: "harshitha.nimmagadda2641@gmail.com", department: "AIML" },
    { studentId: "25241A6642", name: "OGIRALA SUSHANTH", email: "sushanth.ogirala2642@gmail.com", department: "AIML" },
    { studentId: "25241A6643", name: "PADILAM JASWANTH", email: "jaswanth.padilam2643@gmail.com", department: "AIML" },
    { studentId: "25241A6644", name: "PALLERLA SAKETH SANJAY", email: "sanjay.pallerla2644@gmail.com", department: "AIML" },
    { studentId: "25241A6645", name: "PARLA VENKATA NAGA NIPUN", email: "nipun.parla2645@gmail.com", department: "AIML" },
    { studentId: "25241A6646", name: "RACHARLA SUDHEENDRA", email: "sudheendra.racharla2646@gmail.com", department: "AIML" },
    { studentId: "25241A6647", name: "REMIDALA RAVITHRENI", email: "ravithreni.remidala2647@gmail.com", department: "AIML" },
    { studentId: "25241A6648", name: "SANJAY RAKALA", email: "rakala.sanjay2648@gmail.com", department: "AIML" },
    { studentId: "25241A6649", name: "SARAMPALLY SHRUTHI", email: "shruthi.sarampally2649@gmail.com", department: "AIML" },
    { studentId: "25241A6650", name: "SHAIK ABDUL MUHAIMEEN", email: "muhaimeen.shaik2650@gmail.com", department: "AIML" },
    { studentId: "25241A6651", name: "SHAIK MAHEFOOZ", email: "mahefooz.shaik2651@gmail.com", department: "AIML" },
    { studentId: "25241A6652", name: "SHAIK THOUFIQ", email: "thoufiq.shaik2652@gmail.com", department: "AIML" },
    { studentId: "25241A6653", name: "SIDHARTHA PAITHARI", email: "paithari.sidhartha2653@gmail.com", department: "AIML" },
    { studentId: "25241A6654", name: "SRI NAGA VEDA AMRUTA PUTREVU", email: "putrevu.sri2654@gmail.com", department: "AIML" },
    { studentId: "25241A6655", name: "T MOHAN", email: "mohan.t2655@gmail.com", department: "AIML" },
    { studentId: "25241A6656", name: "TALLURI RISHITHA", email: "rishitha.talluri2656@gmail.com", department: "AIML" },
    { studentId: "25241A6657", name: "TANU SHREE GANDRAKOTA", email: "gandrakota.tanu2657@gmail.com", department: "AIML" },
    { studentId: "25241A6658", name: "TEJASWINI SWAIN", email: "swain.tejaswini2658@gmail.com", department: "AIML" },
    { studentId: "25241A6659", name: "THANDALA AKSHARA", email: "akshara.thandala2659@gmail.com", department: "AIML" },
    { studentId: "25241A6660", name: "THUNUGUNTA GANASRI", email: "ganasri.thunugunta2660@gmail.com", department: "AIML" },
    { studentId: "25241A6661", name: "VADITHYA JHANSI", email: "jhansi.vadithya2661@gmail.com", department: "AIML" },
    { studentId: "25241A6662", name: "VADTHYAVATH ABHI", email: "abhi.vadthyavath2662@gmail.com", department: "AIML" },
    { studentId: "25241A6663", name: "VAKITI LOKESH", email: "lokesh.vakiti2663@gmail.com", department: "AIML" },
    { studentId: "25241A6664", name: "VANKUDOTH BHARATH", email: "bharath.vankudoth2664@gmail.com", department: "AIML" },
    { studentId: "25241A6665", name: "VORUGANTI PUNEETH", email: "puneeth.voruganti2665@gmail.com", department: "AIML" },
    { studentId: "25241A6666", name: "KARRA SRI CHANDANA", email: "chandana.karra2666@gmail.com", department: "AIML" },
    { studentId: "25241A6667", name: "NIMMASHETTI INDUJA", email: "induja.nimmashetti2667@gmail.com", department: "AIML" },
    { studentId: "25241A6668", name: "GUNTUKA JAHNAVI", email: "jahnavi.guntuka2668@gmail.com", department: "AIML" },
    { studentId: "25241A6669", name: "LAKKAKULA AJAY", email: "ajay.lakkakula2669@gmail.com", department: "AIML" },
    { studentId: "25241A6670", name: "BALSU BHAVANI", email: "bhavani.balsu2670@gmail.com", department: "AIML" },
    { studentId: "25241A6671", name: "MAINDIPETA CHANDANA", email: "chandana.maindipeta2671@gmail.com", department: "AIML" },
    { studentId: "25241A6672", name: "GUGULOTH VIJAY", email: "vijay.guguloth2672@gmail.com", department: "AIML" }
];
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
        [student.studentId, student.name, student.email, student.department]
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

        idCell.textContent = student.studentId;
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

async function initializeStudents() {
    openStudentList();
    showLoadingMessage();

    let importError = null;
    try {
        await request("/students/import", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ students: studentsData })
        });
    } catch (error) {
        importError = error;
    }

    try {
        await loadStudents();
        showStatus(importError ? `Unable to merge class list: ${importError.message}` : "", Boolean(importError));
    } catch (error) {
        const message = importError
            ? `Unable to merge class list: ${importError.message}. Unable to load students: ${error.message}`
            : `Unable to load students: ${error.message}`;
        showStatus(message, true);
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
    document.getElementById("studentId").value = student.studentId;
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
        studentId: document.getElementById("studentId").value,
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
initializeStudents();
