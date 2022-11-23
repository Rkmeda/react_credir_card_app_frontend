import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from "react-router-dom";
import CreditCard from "./components/creditcard.component";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path="/" element={<CreditCard/>} />
      </Routes>
    </div>
  );
}

export default App;
