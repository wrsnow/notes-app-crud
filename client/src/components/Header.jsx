import React from "react";
import HeaderEl from "../custom-elements/HeaderStyled";

function Header({ setIsLoggedIn, currentUser, setUserId }) {
  const username = localStorage.getItem("username");
  console.log(username);

  function handleLogout() {
    setIsLoggedIn(false);
    setUserId("");
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
          Logged as <strong>{currentUser || username}</strong>
        </span>
      </div>
    </HeaderEl>
  );
}

export default Header;
