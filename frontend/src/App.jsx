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
import Checkout from "./checkout";
import AdoptionPage from "./adoption";
import CarouselComponent from "./virtualadopt";
import WoofAI from "./woof";
import CarouselWithIcons from "./vet";
import PetSocialFeed from "./petforum";
import KnowYourPet from "./kyp";
import Feed from "./feed";
import Chatbot from "./chatbot";
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
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/adoption" element={<AdoptionPage />} />
        <Route path="/virtualAdopt" element={<CarouselComponent />} />
        <Route path="/woofAI" element={<WoofAI />} />
        <Route path="/vet" element={<CarouselWithIcons />} />
        <Route path="/community" element={<Feed />} />
        <Route path="/knowyourpets" element={<KnowYourPet />} />
        <Route path="/petforum" element={<PetSocialFeed />} />
        <Route path="/activate/:uid/:token" element={<AccountActivation />} /> 
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;
