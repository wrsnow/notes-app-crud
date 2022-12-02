import React from "react";
import axios from "axios";
import { useState } from "react";

function Note({
  name,
  deleteNote,
  content,
  setRefreshAPI,
  uid: uuid,
  URL,
  user_id,
}) {
  const [isBeingEdittedTitle, setIsBeingEdittedTitle] = useState(false);
  const [isBeingEditted, setIsBeingEditted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const edittedNoteContent = (uuid) => {
    console.log(uuid);
    console.log(inputValue);
    if (!inputValue) {
      setIsBeingEditted(false);

      return;
    }
    axios
      .put(`${URL}/notes/${uuid}`, {
        user_id,
        noteName: name,
        noteContent: inputValue,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setIsBeingEditted(false);
    setInputValue("");
    setTimeout(() => setRefreshAPI((prev) => !prev), 300);
  };

  const editNoteTitle = (uuid) => {
    console.log(uuid);
    console.log(inputValue);
    axios
      .put(`${URL}/notes/${uuid}`, {
        user_id,
        noteName: inputValue,
        noteContent: content,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setIsBeingEdittedTitle(false);
    setInputValue("");
    setTimeout(() => setRefreshAPI((prev) => !prev), 300);
  };

  return (
    <div className="card-container">
      <div className="card-header"></div>
      <div className="card-name">
        {isBeingEdittedTitle ? (
          <input
            type="text"
            placeholder="Title..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ) : (
          <h3>{name}</h3>
        )}
        {isBeingEdittedTitle ? (
          <button onClick={() => editNoteTitle(uuid)}>
            <i className="fa-solid fa-check"></i>
          </button>
        ) : (
          <button onClick={() => setIsBeingEdittedTitle((prev) => !prev)}>
            <i className="fa-solid fa-pen"></i>{" "}
          </button>
        )}
      </div>
      <div className="note-content">
        {!isBeingEditted ? (
          <p>
            {content
              ? content
              : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
          inventore?`}
          </p>
        ) : (
          <>
            <textarea
              cols="30"
              rows="10"
              onChange={(e) => setInputValue(e.target.value)}
            ></textarea>
            <button onClick={() => edittedNoteContent(uuid)}>
              <i className="fa-solid fa-check"></i>
            </button>
          </>
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
