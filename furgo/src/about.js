import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// Animation: Images move outward from the center
const moveOutwards = (x, y) => keyframes`
  from { transform: translate(0, 0); opacity: 0; }
  to { transform: translate(${x}, ${y}); opacity: 1; }
`;

// Styled Components
const AboutSection = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  overflow: hidden;
  background: rgb(128, 228, 226);
  padding: 20px;
  font-family: "Montaga", serif;

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding: 10px;
  }
`;

const AboutContent = styled.div`
  max-width: 600px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
  position: relative;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
  }
`;

const Image = styled.img`
  width: 130px;
  height: 160px;
  position: absolute;
  opacity: 0;
  animation: ${({ x, y }) => moveOutwards(x, y)} 1s ease-out forwards;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 80px;
    height: 100px;
  }
`;

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerInstance.disconnect(); // Stop observing after activation
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById("about-section");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Images move outward in different directions
  const images = [
    { src: "/pet1.jpeg", x: "-240px", y: "-240px" }, // Top-left
    { src: "/pet2.jpeg", x: "100px", y: "-230px" }, // Top-right
    { src: "/pet3.jpeg", x: "-340px", y: "230px" }, // Bottom-left
    { src: "/pet4.jpeg", x: "40px", y: "240px" }, // Bottom-right
    { src: "/pet5.jpeg", x: "-500px", y: "-220px" }, // Top-center
    { src: "/pet6.jpeg", x: "600px", y: "-200px" }, // Bottom-center
    { src: "/pet7.jpeg", x: "-580px", y: "90px" }, // Left-center
    { src: "/pet8.jpeg", x: "550px", y: "50px" },
    { src: "/pet9.jpeg", x: "-420px", y: "-30px" },
    { src: "/pet10.jpeg", x: "400px", y: "240px" },
    { src: "/Groom.jpeg", x: "380px", y: "-230px" }, // Replaced duplicate pet1
  ];

  // Adjusted positions for mobile
  const mobileImages = [
    { src: "/pet1.jpeg", x: "-120px", y: "-120px" }, // Top-left
    { src: "/pet2.jpeg", x: "80px", y: "-120px" }, // Top-right
    { src: "/pet3.jpeg", x: "-120px", y: "120px" }, // Bottom-left
    { src: "/pet4.jpeg", x: "80px", y: "120px" }, // Bottom-right
    { src: "/pet5.jpeg", x: "-200px", y: "-100px" }, // Top-center
    { src: "/pet6.jpeg", x: "200px", y: "-100px" }, // Bottom-center
    { src: "/pet7.jpeg", x: "-200px", y: "50px" }, // Left-center
    { src: "/pet8.jpeg", x: "200px", y: "50px" },
    { src: "/pet9.jpeg", x: "-150px", y: "-20px" },
    { src: "/pet10.jpeg", x: "150px", y: "120px" },
    { src: "/Groom.jpeg", x: "150px", y: "-120px" }, // Replaced duplicate pet1
  ];

  return (
    <AboutSection id="about-section">
      {/* Animated Images */}
      {isVisible &&
        (window.innerWidth <= 768 ? mobileImages : images).map((img, index) => (
          <Image key={index} src={img.src} x={img.x} y={img.y} alt={`Pet ${index + 1}`} />
        ))}

      {/* About Content */}
      <AboutContent>
        <h1>About Us</h1>
        <p>
          Welcome to FurGo, your one-stop destination for all things pets! 🐾 We offer grooming,
          vet consultations, premium pet products, and adoption services to ensure your furry
          friends get the best care. Our AI-powered assistant helps you understand their needs,
          while virtual adoption lets you support rescued animals. Join us in creating a happier
          world for our little companions! 🐶🐱💙
        </p>
      </AboutContent>
    </AboutSection>
  );
};

export default About;