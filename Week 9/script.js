// Select elements
const noteInput = document.querySelector("#noteInput");
const addNoteBtn = document.querySelector("#addNoteBtn");
const notesList = document.querySelector("#notesList");

// Load notes from localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Display notes on load
displayNotes();

// Add note event
addNoteBtn.addEventListener("click", () => {
  const noteText = noteInput.value.trim();
  if (noteText === "") {
    alert("❌ Please enter a note!");
    return;
  }

  // Add to array
  notes.push(noteText);

  // Save to localStorage
  saveNotes();

  // Display updated notes
  displayNotes();

  // Clear input
  noteInput.value = "";
});

// Function to display notes
function displayNotes() {
  notesList.innerHTML = "";
  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${note}</span>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;
    notesList.appendChild(li);
  });
}

// Function to save notes in localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to delete a note
function deleteNote(index) {
  notes.splice(index, 1); // remove from array
  saveNotes(); // update storage
  displayNotes(); // refresh UI
}
