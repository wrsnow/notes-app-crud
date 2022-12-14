import React from "react";
import { useState } from "react";
import { set, getDatabase, ref, remove } from "firebase/database";

function Note({ noteTitle, noteContent, setRefreshAPI, noteID, uid }) {
  console.log("Note");

  const [isBeingEdittedTitle, setIsBeingEdittedTitle] = useState(false);
  const [isBeingEditted, setIsBeingEditted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");

  ///Update note title
  function updateNoteTitle() {
    if (!inputValue) return setIsBeingEdittedTitle(false);
    const db = getDatabase();
    set(ref(db, `users_notes/${uid}/${noteID}`), {
      noteTitle: inputValue,
      noteContent: noteContent,
    }).catch((err) => console.error(err));
    setTimeout(() => setRefreshAPI((prev) => !prev), 500);
  }

  /// Update note content
  function updateNoteContent() {
    const db = getDatabase();
    set(ref(db, `users_notes/${uid}/${noteID}`), {
      noteTitle: noteTitle,
      noteContent: newNoteContent,
    }).catch((err) => console.error(err));
    setTimeout(() => setRefreshAPI((prev) => !prev), 500);
  }

  /// Delete note
  function deleteNote() {
    const db = getDatabase();
    remove(ref(db, `users_notes/${uid}/${noteID}`)).catch((err) =>
      console.error(err)
    );
    setTimeout(() => setRefreshAPI((prev) => !prev), 500);
  }

  return (
    <div className="card-container">
      <div className="card-header"></div>
      <div className="card-noteTitle">
        {isBeingEdittedTitle ? (
          <input
            type="text"
            placeholder="Title..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ) : (
          <h3>{noteTitle}</h3>
        )}
        {isBeingEdittedTitle ? (
          <button onClick={updateNoteTitle}>
            <i className="fa-solid fa-check"></i>
          </button>
        ) : (
          <button onClick={() => setIsBeingEdittedTitle((prev) => !prev)}>
            <i className="fa-solid fa-pen"></i>{" "}
          </button>
        )}
      </div>
      <div className="line"></div>
      <div className="note-noteContent">
        {!isBeingEditted ? (
          <p>{noteContent ? noteContent : `Start by writing something...`}</p>
        ) : (
          <div className="edit-note">
            <textarea
              cols="30"
              rows="10"
              onChange={(e) => setNewNoteContent(e.target.value)}
            ></textarea>
            <div className="edit-note-buttons">
              <button onClick={() => setIsBeingEditted(false)}>X</button>
              <button onClick={updateNoteContent}>
                <i className="fa-solid fa-check"></i>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="buttons">
        <button onClick={() => setIsBeingEditted(true)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={deleteNote}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
}

export default Note;
