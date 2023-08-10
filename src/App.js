// import logo from './logo.svg';
import axios from "axios";
import "./App.css";

import Translate from "./questions/Translate";
import { useState } from "react";

const App = () => {
  return (
    <div className="App">
      <Translate />
    </div>
  );
};

export default App;
