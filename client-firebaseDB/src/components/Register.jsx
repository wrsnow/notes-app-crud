import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import Form from "../custom-elements/Form";

function Register({ setHasAccount }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        setHasAccount(true);
        alert("Account created successfully");
        // ...
      })
      .catch((error) => {
        console.log(error);
        let isEmailAvailableRegex = /email-already-in-use/g;
        let isPasswordValidRegex = /weak-password/g;
        const errorCode = error.code;
        const errorMessage = error.message;
        if (isEmailAvailableRegex.test(error)) {
          return alert("Email is already in use.");
        }
        if (isPasswordValidRegex.test(error)) {
          return alert("Password should be at least 6 characters long.");
        }
        return alert("Something went wrong.");
        //
      });
  };
  return (
    <Form onSubmit={createAccount}>
      <label htmlFor="">Email</label>
      <input
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name="email"
        type="email"
      />
      {/* <span className="dataChecker">• Email cannot be blank.</span> */}
      <br />
      <label htmlFor="">Username</label>
      <input
        required
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        name="username"
        type="text"
      />
      {/* <span className="dataChecker">• Username is not available.</span> */}
      <br />
      <label htmlFor="">Password</label>
      <input
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password"
        type="password"
      />
      {/* <span className="dataChecker">• Password cannot be null.</span> */}

      <div className="login-input">
        <button onClick={() => setHasAccount(true)}>LOGIN</button>
        <button type="submit">SIGN UP</button>
      </div>
    </Form>
  );
}

export default Register;
