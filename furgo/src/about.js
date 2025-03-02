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
  background: #f9f9f9;
  padding: 20px;
`;

const AboutContent = styled.div`
  max-width: 600px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
  position: relative;
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
    height: 120px;
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
    { src: "/pet1.jpeg", x: "-190px", y: "-220px" }, // Top-left
    { src: "/pet2.jpeg", x: "100px", y: "-230px" }, // Top-right
    { src: "/pet3.jpeg", x: "-390px", y: "190px" }, // Bottom-left
    { src: "/pet4.jpeg", x: "70px", y: "220px" }, // Bottom-right
    { src: "/pet5.jpeg", x: "-500px", y: "-220px" }, // Top-center
    { src: "/pet6.jpeg", x: "600px", y: "-200px" }, // Bottom-center
    { src: "/pet7.jpeg", x: "-580px", y: "90px" }, // Left-center
    { src: "/pet8.jpeg", x: "550px", y: "50px" },
    { src: "/pet9.jpeg", x: "-420px", y: "-30px" },
    { src: "/pet10.jpeg", x: "400px", y: "140px" },
    { src: "/pet1.jpeg", x: "380px", y: "-200px" }, // Replaced duplicate pet1
  ];

  return (
    <AboutSection id="about-section">
      {/* Animated Images */}
      {isVisible &&
        images.map((img, index) => (
          <Image key={index} src={img.src} x={img.x} y={img.y} alt={`Pet ${index + 1}`} />
        ))}

      {/* About Content */}
      <AboutContent>
        <h2>About Us</h2>
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
