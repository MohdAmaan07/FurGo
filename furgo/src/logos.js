import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// List of logos (Ensure these exist in the public folder)
const logos = [
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
  "13.png",
  "14.png",
  "15.png",
];

// Customizable settings
const LOGO_WIDTH = 350; // Default width of logos
const LOGO_HEIGHT = 250; // Default height of logos
const LOGO_GAP = 30; // Default gap between logos
const SCROLL_SPEED = 15; // Default scroll speed (lower value = faster scrolling)

// Styled Components
const SectionContainer = styled.div`
  text-align: center;
  padding: 40px 0;
  background: #f9f9f9;
`;

const Title = styled.h2`
  font-family: "Montaga", serif;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 5px;
  color: orange;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 20px 0;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: ${LOGO_GAP}px;
  width: ${({ totalLogos }) => totalLogos * (LOGO_WIDTH + LOGO_GAP)}px;
  animation: scroll ${({ duration }) => duration}s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 1024px) {
    gap: ${LOGO_GAP / 2}px;
    width: ${({ totalLogos }) => totalLogos * (LOGO_WIDTH * 0.8 + LOGO_GAP / 2)}px;
  }

  @media (max-width: 768px) {
    gap: ${LOGO_GAP / 3}px;
    width: ${({ totalLogos }) => totalLogos * (LOGO_WIDTH * 0.6 + LOGO_GAP / 3)}px;
  }

  @media (max-width: 480px) {
    gap: ${LOGO_GAP / 4}px;
    width: ${({ totalLogos }) => totalLogos * (LOGO_WIDTH * 0.4 + LOGO_GAP / 4)}px;
  }
`;

const Logo = styled.img`
  width: ${LOGO_WIDTH}px;
  height: ${LOGO_HEIGHT}px;
  object-fit: contain; // Ensures logos scale properly

  @media (max-width: 1024px) {
    width: ${LOGO_WIDTH * 0.8}px;
    height: ${LOGO_HEIGHT * 0.8}px;
  }

  @media (max-width: 768px) {
    width: ${LOGO_WIDTH * 0.6}px;
    height: ${LOGO_HEIGHT * 0.6}px;
  }

  @media (max-width: 480px) {
    width: ${LOGO_WIDTH * 0.4}px;
    height: ${LOGO_HEIGHT * 0.4}px;
  }
`;

const InfinityLogoCarousel = () => {
  const [duplicatedLogos, setDuplicatedLogos] = useState([...logos, ...logos]); // Duplicate for seamless looping
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.addEventListener("animationiteration", () => {
        track.style.transform = "translateX(0)";
      });
    }
  }, []);

  return (
    <SectionContainer>
      <Title>Collaborators & Partners</Title>
      <CarouselContainer>
        <CarouselTrack ref={trackRef} totalLogos={logos.length} duration={SCROLL_SPEED}>
          {duplicatedLogos.map((logo, index) => (
            <Logo key={index} src={`/${logo}`} alt={`Collaborator Logo ${index + 1}`} />
          ))}
        </CarouselTrack>
      </CarouselContainer>
    </SectionContainer>
  );
};

export default InfinityLogoCarousel;