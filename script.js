const API_URL = "http://localhost:3000/students";

const tableBody = document.querySelector("#students-table tbody");
const getBtn = document.getElementById("get-students-btn");
const form = document.getElementById("add-student-form");


async function getStudents() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderStudents(data);
}


function renderStudents(students) {
  tableBody.innerHTML = "";

  students.forEach((s) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.age}</td>
      <td>${s.course}</td>
      <td>${s.skills.join(", ")}</td>
      <td>${s.email}</td>
      <td>${s.isEnrolled ? "Так" : "Ні"}</td>
      <td>
        <button onclick="updateStudent(${s.id})">Оновити</button>
        <button onclick="deleteStudent(${s.id})">Видалити</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}


async function addStudent(e) {
  e.preventDefault();

  const student = {
    name: name.value,
    age: Number(age.value),
    course: course.value,
    skills: skills.value.split(",").map((s) => s.trim()),
    email: email.value,
    isEnrolled: isEnrolled.checked,
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  form.reset();
  getStudents();
}

async function updateStudent(id) {
  const newName = prompt("Нове ім'я:");

  if (!newName) return;

  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName }),
  });

  getStudents();
}


async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  getStudents();
}


getBtn.addEventListener("click", getStudents);
form.addEventListener("submit", addStudent);


getStudents();
