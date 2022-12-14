import { getDatabase, push, ref } from "firebase/database";
import React, { useRef } from "react";

function CreateNewNote({ setRefetchAPI, uid }) {
  const titleInput = useRef("");
  const contentInput = useRef("");

  function writeUserData(e) {
    const noteTitle = titleInput.current.value;
    const noteContent = contentInput.current.value;
    e.preventDefault();
    if (!noteTitle || !noteContent) return;
    const db = getDatabase();
    push(ref(db, "users_notes/" + uid), {
      noteTitle: noteTitle,
      noteContent: noteContent,
    }).catch((err) => console.log(err));
    e.target.reset();
    setRefetchAPI((prev) => !prev);
  }

  return (
    <form onSubmit={writeUserData} className="form">
      <input ref={titleInput} type="text" placeholder="Note name..." />
      <textarea ref={contentInput} cols="30" rows="10"></textarea>
      <button type="submit">ADD</button>
    </form>
  );
}

export default CreateNewNote;
