import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import BottomNav from "./BNav";
import TopNavbar from "./TNav";
import ThreeCards from "./three";
import About from "./about";

function App() {
  return (
    <div className="App">
      <BottomNav />
      <TopNavbar />
      <ThreeCards />
      <About />
    </div>
  );
}

export default App;
