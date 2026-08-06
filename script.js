const API_URL = "http://localhost:3000/students";

const tableBody = document.querySelector("#students-table tbody");
const getBtn = document.getElementById("get-students-btn");
const form = document.getElementById("add-student-form");

// Отримати студентів
async function getStudents() {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Не вдалося отримати список студентів");
    }

    const data = await res.json();
    renderStudents(data);
  } catch (error) {
    console.error("Помилка:", error);
    alert("Помилка при завантаженні студентів");
  }
}

// Відображення студентів
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

// Додати студента
async function addStudent(e) {
  e.preventDefault();

  try {
    const student = {
      name: name.value,
      age: Number(age.value),
      course: course.value,
      skills: skills.value.split(",").map((s) => s.trim()),
      email: email.value,
      isEnrolled: isEnrolled.checked,
    };

    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    if (!res.ok) {
      throw new Error("Не вдалося додати студента");
    }

    form.reset();
    getStudents();
  } catch (error) {
    console.error("Помилка:", error);
    alert("Помилка при додаванні студента");
  }
}

// Оновити студента
async function updateStudent(id) {
  const newName = prompt("Нове ім'я:");

  if (!newName) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    });

    if (!res.ok) {
      throw new Error("Не вдалося оновити студента");
    }

    getStudents();
  } catch (error) {
    console.error("Помилка:", error);
    alert("Помилка при оновленні студента");
  }
}

// Видалити студента
async function deleteStudent(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Не вдалося видалити студента");
    }

    getStudents();
  } catch (error) {
    console.error("Помилка:", error);
    alert("Помилка при видаленні студента");
  }
}

// Події
getBtn.addEventListener("click", getStudents);
form.addEventListener("submit", addStudent);

// Завантажити список при відкритті сторінки
getStudents();
