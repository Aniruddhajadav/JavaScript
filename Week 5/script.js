// 🌍 Global array to store students
let students = [];

// 🛠 Function to add student (array + object)
function addStudent() {
  let name = document.getElementById("name").value;
  let grade = parseFloat(document.getElementById("grade").value);

  if (name === "" || isNaN(grade) || grade < 0 || grade > 100) {
    alert("❌ Please enter a valid name and grade (0-100).");
    return;
  }

  // Object for student
  let student = {
    name: name,
    grade: grade
  };

  // Push object into array
  students.push(student);

  // Clear inputs
  document.getElementById("name").value = "";
  document.getElementById("grade").value = "";

  displayStudents();
  calculateStats();
}

// 🔄 Display students using forEach
function displayStudents() {
  let list = document.getElementById("studentList");
  list.innerHTML = "";

  students.forEach((student, index) => {
    let li = document.createElement("li");
    li.innerText = `${index + 1}. ${student.name} - ${student.grade}`;
    list.appendChild(li);
  });
}

// 📊 Calculate stats using map + filter
function calculateStats() {
  if (students.length === 0) {
    document.getElementById("average").innerText = "";
    document.getElementById("passed").innerText = "";
    return;
  }

  // map → extract grades
  let grades = students.map(student => student.grade);

  // Average
  let total = 0;
  grades.forEach(g => total += g);
  let average = (total / grades.length).toFixed(2);

  // filter → students who passed (>= 40)
  let passedStudents = students.filter(student => student.grade >= 40);

  document.getElementById("average").innerText = `📊 Average Grade: ${average}`;
  document.getElementById("passed").innerText = `✅ Students Passed: ${passedStudents.length}`;
}

// Extra: Remove a student (optional function)
function removeStudent(name) {
  students = students.filter(student => student.name !== name);
  displayStudents();
  calculateStats();
}

// Example logs for learning
console.log("Initial students array:", students);
