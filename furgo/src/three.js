import React from "react";
import styled from "styled-components";

// Styled Components for Layout
const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

// Left Large Image Card
const LeftCard = styled.div`
  width: 2500px;
  height: 700px;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Right Side Container (Stacked Cards with Position Control)
const RightCards = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

// Text Overlay (Initially Hidden, Appears on Hover)
const TextOverlay = styled.div`
  position: absolute;
  z-index: 2;
  color: white;
  font-size: 22px;
  font-weight: light;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  text-align: center;
`;

// Common Card Styles (For Hover Background Effect)
const Card = styled.div`
  border-radius: 10px;
  overflow: hidden;
  position: absolute;
  width: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;

  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6); /* Semi-transparent dark background */
  }

  &:hover ${TextOverlay} {
    opacity: 1;
  }

  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Large Right Card (Image)
const LargeCard = styled(Card)`
  height: 220px;
  top: -350px;
  left: -10px;
`;

// Small Right Card (Video)
const SmallCard = styled(Card)`
  height: 450px;
  top: -120px;
  left: -10px;
`;

const ThreeCards = () => {
  return (
    <Container>
      {/* Left Side - Large Image Card */}
      <LeftCard>
        <img src="/FurGo (1).png" alt="Large Image" />
      </LeftCard>

      {/* Right Side - Two Stacked Cards with Position Control */}
      <RightCards>
        <LargeCard>
          <img src="/Groom.jpeg" alt="Top Image" />
          <TextOverlay>Grooming Services</TextOverlay>
        </LargeCard>
        <SmallCard>
          <video autoPlay loop muted>
            <source src="/dog1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <TextOverlay>Playful Moments</TextOverlay>
        </SmallCard>
      </RightCards>
    </Container>
  );
};

export default ThreeCards;
