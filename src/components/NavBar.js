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
            boxShadow: "5px 2px 5px",
          }}
          className="navbar-item dbtn"
          onClick={changeMode}
        >
          <i className="icon-dark-light d-flex justify-item-center">
              <ion-icon
                name={mode ? "sunny" : "moon"}
                style={{ height: "30px", width: "30px" }}
                
              ></ion-icon>
            </i>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
