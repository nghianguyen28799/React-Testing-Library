import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Skills } from "./components/skills/Skills";
import { Counter } from "./components/counter/counter";
import { AppProviders } from "./components/providers/AppProviders";
import { MuiMode } from "./components/mode/mode";

function App() {
  const skills = ["HTML", "CSS", "Javascript"];
  return (
    <AppProviders>
      <div className="App">
        {/* <Skills skills={skills} /> */}
        {/* <Counter /> */}
        <MuiMode />
      </div>
    </AppProviders>
  );
}

export default App;
