import React from "react";
import { useModeContext } from "../contexts/mode";

const NavBar = (props) => {
  const { dateAndTime } = props;
  const { mode, setMode } = useModeContext();

  const changeMode = () => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  };

  return (
    <nav
      className="navbar navbar-dark"
      style={{ backgroundColor: "rgba(16 85 135 0)" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="favicon.png"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top navlogo"
          />
          &nbsp;Weather Today
        </a>
        <span className="navbar-item" href="/">
          {dateAndTime}
        </span>
        <button
          style={{
            borderRadius: "50%",
            border: "2px solid white",
			boxShadow: "5px 2px 5px"
          }}
          className="navbar-item"
          href="/"
        >
          {mode ? (
            <i className="icon-dark-light">
              <ion-icon name="sunny" onClick={changeMode}></ion-icon>
            </i>
          ) : (
            <i className="icon-dark-light">
              <ion-icon name="moon" onClick={changeMode}></ion-icon>
            </i>
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
