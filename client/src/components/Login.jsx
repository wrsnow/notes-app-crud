import React, { useState } from "react";
import Div from "../custom-elements/LoginDiv";
import Form from "../custom-elements/Form";
import axios from "axios";

const URL = "http://localhost:3001/api";

function Login({ setUserId, setIsLoggedIn, setCurrentUser }) {
  const [credentialsMatch, setCredentialsMatch] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInputValid, setIsInputValid] = useState({
    email: true,
    username: true,
    password: true,
  });
  const [hasAccount, setHasAccount] = useState(true);

  const clearInputs = () => {
    setEmail("");
    setUsername("");
    setPassword("");
  };

  const changeForm = (e) => {
    e.preventDefault();
    console.log(e);
    setHasAccount((prev) => !prev);
    setCredentialsMatch(null);
    clearInputs();
  };

  function checkValidation() {
    if (!email)
      return setIsInputValid((prev) => {
        return { ...prev, email: false };
      });
    if (!username)
      return setIsInputValid((prev) => {
        return { ...prev, username: false };
      });
    if (!password)
      return setIsInputValid((prev) => {
        return { ...prev, password: false };
      });
    setIsInputValid({
      email: true,
      username: true,
      password: true,
    });
    return Object.values(isInputValid).every((key) => key);
  }

  function handleSignUp(e) {
    e.preventDefault();
    let ValidationTest = checkValidation();
    if (!ValidationTest) return;
    console.log("All valid");
    axios
      .post(`${URL}/register`, {
        email,
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        setCredentialsMatch(true);
        setHasAccount(true);
        clearInputs();
        alert("Success");
      })
      .catch((err) => {
        if (err) {
          setCredentialsMatch(false);
          alert("Not available!");
          return console.log(err);
        }
      });
  }

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post(`${URL}/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        setUserId(res.data[0].user_id);
        setCurrentUser(username);
        setCredentialsMatch(true);
        setIsLoggedIn(true);
        localStorage.setItem("username", username);
        localStorage.setItem("user_id", res.data[0].user_id);
        localStorage.setItem("isLoggedIn", true);
      })
      .catch((err) => {
        if (err) {
          setCredentialsMatch(false);
          alert(err.response.data);
          setTimeout(setCredentialsMatch(null), 1600); //Reset styles for inputs
          return;
        }
      });
    clearInputs();
  }

  return (
    <Div credentialsMatch={credentialsMatch}>
      <h1 style={{ margin: "0" }}>{hasAccount ? "Login" : "Register"}</h1>
      {hasAccount && (
        <div className="statusMessage">
          <span>Username or Password does not match.</span>
        </div>
      )}
      {hasAccount ? (
        <Form onSubmit={handleLogin}>
          <label htmlFor="">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
            type="text"
          />
          <br />
          <label htmlFor="">Password</label>
          <input
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
        <Form onSubmit={handleSignUp}>
          <label htmlFor="">Email</label>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            type="email"
          />
          {!isInputValid.email && (
            <span className="dataChecker">• Email cannot be blank.</span>
          )}
          <br />
          <label htmlFor="">Username</label>
          <input
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            name="username"
            type="text"
          />
          {!isInputValid.username && (
            <span className="dataChecker">• Username is not available.</span>
          )}

          <br />
          <label htmlFor="">Password</label>
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            type="password"
          />
          {!isInputValid.password && (
            <span className="dataChecker">• Password cannot be null.</span>
          )}

          <div className="login-input">
            <button onClick={changeForm}>LOGIN</button>
            <button type="submit">SIGN UP</button>
          </div>
        </Form>
      )}
    </Div>
  );
}

export default Login;
