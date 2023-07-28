import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  return (
    <div className="container">
      <div className="app">
        <Header title="CURRENCY CONVERTER" />
        <Main />
      </div>
    </div>
  );
}

export default App;
