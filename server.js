document.addEventListener("DOMContentLoaded", function() {
  const saveNoteButton = document.querySelector(".fa-save");
  const newNoteButton = document.querySelector(".fa-plus");
  const noteTitleInput = document.querySelector(".note-title");
  const noteTextarea = document.querySelector(".note-textarea");

  // Event listener for the save button
  saveNoteButton.addEventListener("click", function() {
    const noteTitle = noteTitleInput.value.trim();
    const noteText = noteTextarea.value.trim();

    if (noteTitle && noteText) {
      fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: noteTitle, text: noteText }),
      })
        .then((response) => response.json())
        .then((note) => {
          console.log("Note saved", note);
          noteTitleInput.value = "";
          noteTextarea.value = "";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });

  // Event listener for the new note button
  newNoteButton.addEventListener("click", function() {
    noteTitleInput.value = "";
    noteTextarea.value = "";
  });
});
