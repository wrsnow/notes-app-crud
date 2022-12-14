import React from "react";
import { auth } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";

import HeaderEl from "../custom-elements/HeaderStyled";

function Header({ currentUser, setIsLoggedIn, setUid }) {
  const username = localStorage.getItem("username");

  console.log("Header");

  function handleLogout() {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        setUid("");
        alert("Logged out successfully");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    localStorage.clear();
  }

  return (
    <HeaderEl>
      {/* <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul> */}
      <div className="logged-user-container">
        <div className="user-info">
          <button onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
        <span>
          Logged as:
          <strong> {currentUser ?? "Unknown"}</strong>
        </span>
      </div>
    </HeaderEl>
  );
}

export default Header;
