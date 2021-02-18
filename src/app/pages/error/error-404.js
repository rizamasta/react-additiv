import React from "react";
import logo from "assets/img/logo.svg";
import "app/main/App.css";

function Error404() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Error 404. Page Not Found</p>
        <a className="App-link" href="/" rel="noopener noreferrer">
          Back to home
        </a>
      </header>
    </div>
  );
}

export default Error404;
