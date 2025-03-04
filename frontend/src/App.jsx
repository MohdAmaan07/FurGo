import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import BottomNav from "./BNav";
import TopNavbar from "./TNav";
import ThreeCards from "./three";
import About from "./about";
import InfinityLogoCarousel from "./logos";
import ReviewsCarousel from "./reviews";
import Contact from "./contact";
import Footer from "./footer";


function App() {
  return (
    <div className="App">
      <BottomNav />
      <TopNavbar />
      <ThreeCards />
      <About />
      <InfinityLogoCarousel />
      <ReviewsCarousel />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
