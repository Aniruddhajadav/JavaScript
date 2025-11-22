// Select DOM elements (querySelector)
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

// Event handling
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Function to add task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("❌ Please enter a task!");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Mark as complete on click
  li.querySelector(".task-text").addEventListener("click", function () {
    li.classList.toggle("complete");
  });

  // Delete task
  li.querySelector(".delete-btn").addEventListener("click", function () {
    li.remove();
  });

  // Append to list
  taskList.appendChild(li);

  // Clear input
  taskInput.value = "";
}
