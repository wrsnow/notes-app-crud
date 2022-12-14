import React, { useState } from "react";
import Div from "../custom-elements/LoginDiv";
import Form from "../custom-elements/Form";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Register from "./Register";

function Login({ setUid, setIsLoggedIn, setCurrentUser }) {
  const [credentialsMatch, setCredentialsMatch] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  //Swap Register and Login Pages
  const changeForm = (e) => {
    e.preventDefault();
    setHasAccount((prev) => !prev);
    setCredentialsMatch(null);
  };

  const loginWithEmail = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCurrentUser(user.displayName);
        setUid(user.uid);
        setCredentialsMatch(true);
        setIsLoggedIn(true);
        // ...
      })
      .catch((error) => {
        console.log(error);
        alert("Not found a user with that email.");
      });
  };

  return (
    <Div credentialsMatch={credentialsMatch}>
      {hasAccount && (
        <div className="statusMessage">
          <span>Username or Password does not match.</span>
        </div>
      )}
      <h1 style={{ marginTop: "6rem" }}>{hasAccount ? "Login" : "Register"}</h1>
      {hasAccount ? (
        <Form onSubmit={loginWithEmail}>
          <label htmlFor="">Email</label>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            type="email"
          />
          <br />
          <label htmlFor="">Password</label>
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            type="password"
          />
          <div className="login-input">
            <button onClick={changeForm}>SIGN UP</button>
            <button type="submit">LOGIN</button>
          </div>
        </Form>
      ) : (
        <Register setHasAccount={setHasAccount} />
      )}
    </Div>
  );
}

export default Login;
