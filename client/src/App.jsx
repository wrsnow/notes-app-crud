import { useState, useRef } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "./App.css";
import Note from "./components/Note";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Login from "./components/Login";

const URL = "http://localhost:3001/api";

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const [userId, setUserId] = useState(() => {
    return JSON.parse(localStorage.getItem("user_id")) || "";
  });
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem("isLoggedIn")) || ""
  );
  const [refreshAPI, setRefreshAPI] = useState(false);
  const { data, isFetching, error } = useQuery(
    ["notes", refreshAPI],
    async () => {
      if (!userId) {
        return [];
      } else {
        const res = await axios.get(`${URL}/notes?userid=${userId}`);

        return res.data;
      }
    }
  );
  const [currentInput, setCurrentInput] = useState("");
  const noteInput = useRef("");

  const deleteNote = (uuid) => {
    axios.delete(`${URL}/notes/${userId}/${uuid}`);
    setTimeout(() => setRefreshAPI((prev) => !prev), 300);
  };

  const addNote = () => {
    let { value: noteValue } = noteInput.current;
    axios
      .post(`${URL}/notes/create`, {
        user_id: userId,
        noteName: currentInput,
        noteContent: noteValue,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setCurrentInput("");
    noteValue = "";
    setTimeout(() => setRefreshAPI((prev) => !prev), 300);
  };

  if (error) {
    return (
      <>
        <h1>Server offline.</h1>
      </>
    );
  }

  if (!isLoggedIn) {
    return (
      <Login
        setCurrentUser={setCurrentUser}
        setUserId={setUserId}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  if (isFetching) {
    return <Loading />;
  }
  console.log(data);

  return (
    <div className="App">
      <Header
        currentUser={currentUser}
        setIsLoggedIn={setIsLoggedIn}
        setUserId={setUserId}
      />
      <div className="form">
        <input
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          type="text"
          placeholder="Note name..."
        />
        <textarea ref={noteInput} cols="30" rows="10"></textarea>
        <button onClick={addNote}>ADD</button>
      </div>
      <div className="container">
        {data?.length <= 0 ? (
          <h1>No notes...</h1>
        ) : (
          data?.map((el) => {
            return (
              <Note
                user_id={userId}
                URL={URL}
                uid={el.uid}
                setRefreshAPI={setRefreshAPI}
                deleteNote={() => deleteNote(el.uid)}
                key={el.uid}
                name={el.noteName}
                content={el.noteContent}
              ></Note>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
