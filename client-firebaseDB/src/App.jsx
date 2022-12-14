import { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import Note from "./components/Note";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Login from "./components/Login";
import { child, get } from "firebase/database";
import { dbRef } from "./services/firebaseConfig";
import CreateNewNote from "./components/CreateNewNote";

function App() {
  console.log("App");

  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [uid, setUid] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [refreshAPI, setRefreshAPI] = useState(false);

  useEffect(() => {
    get(child(dbRef, `users_notes/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setIsLoggedIn(true);
          setUserData(Object.entries(snapshot.toJSON()));
          setIsFetching(false);
        } else {
          setIsLoggedIn(true);
          setIsFetching(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      setUserData([]);
    };
  }, [uid, refreshAPI]);

  if (!isLoggedIn) {
    return (
      <Login
        setCurrentUser={setCurrentUser}
        setUid={setUid}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  }

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className="App">
        <Header
          currentUser={currentUser}
          setIsLoggedIn={setIsLoggedIn}
          setUid={setUid}
        />
        <CreateNewNote uid={uid} setRefetchAPI={setRefreshAPI} />
        <div className="container">
          {userData?.length <= 0 ? (
            <h1>No notes...</h1>
          ) : (
            userData?.map((el) => {
              return (
                <Note
                  uid={uid}
                  noteID={el[0]}
                  setRefreshAPI={setRefreshAPI}
                  // deleteNote={() => deleteNote(el.uid)}
                  key={el[0]}
                  noteTitle={el[1].noteTitle}
                  noteContent={el[1].noteContent}
                ></Note>
              );
            })
          )}
        </div>
      </div>
    </Suspense>
  );
}

export default App;
