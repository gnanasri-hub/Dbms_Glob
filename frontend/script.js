const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;

    const li = document.createElement("li");

    li.innerHTML = `
        <strong>${name}</strong><br>
        ${email}<br>
        ${department}
    `;

    studentList.appendChild(li);

    form.reset();
});