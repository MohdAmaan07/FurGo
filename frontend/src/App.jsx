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
import StorePage from "./store";
import AdoptionPage from "./adoption";
import CarouselComponent from "./virtualadopt";
import WoofAI from "./woof";
import CarouselWithIcons from "./vet";
import PetSocialFeed from "./petforum";
import KnowYourPet from "./kyp";
import Feed from "./feed";
import AccountActivation from "./AccountActivation";

function HomePage() {
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/adoption" element={<AdoptionPage />} />
      <Route path="/VirtualAdopt" element={<CarouselComponent />} />
      <Route path="/WoofAI" element={<WoofAI />} />
      <Route path="/Vet" element={<CarouselWithIcons />} />
      <Route path="/community" element={<Feed />} />
      <Route path="/kyp" element={<KnowYourPet />} />
      <Route path="/Feed" element={<PetSocialFeed />} />
      <Route path="/activate/:uid/:token" element={<AccountActivation />} /> 
    </Routes>
  );
}

export default App;
