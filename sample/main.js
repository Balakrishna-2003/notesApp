document.addEventListener("DOMContentLoaded", function () {
    loadNotes();
});

function addNote() {
    var noteInput = document.getElementById("noteInput");
    var noteText = noteInput.value.trim();

    if (noteText !== "") {
        saveNoteToLocalStorage(noteText);
        displayNotes();
        noteInput.value = "";
    } else {
        alert("Please enter a valid note.");
    }
}

function deleteNote(index) {
    if (confirm("Are you sure you want to delete this note?")) {
        var notes = getNotesFromLocalStorage();
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
        displayNotes();
    }
}

function saveNoteToLocalStorage(note) {
    var notes = getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotesFromLocalStorage() {
    var notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
}

function loadNotes() {
    displayNotes();
}

function displayNotes() {
    var notes = getNotesFromLocalStorage();
    var noteList = document.getElementById("noteList");
    noteList.innerHTML = "";

    notes.forEach(function (note, index) {
        var li = document.createElement("li");
        li.innerHTML = `
            ${note}
            <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        `;
        noteList.appendChild(li);
    });
}
