import React from "react";
import styled from "styled-components";
import { FaInstagram, FaFacebook, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";
import footer from "./assets/footer.png";

// Styled Components
const FooterContainer = styled.footer`
  background: #00a9a5;
  color: white;
  padding: 50px 10%;
  display: flex;
  flex-direction: column;
  font-family: "Montaga", serif;

  @media (max-width: 768px) {
    padding: 30px 5%;
    text-align: center;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Address Section - Left Aligned
const Address = styled.div`
  width: 50%;
  text-align: left;
  font-size: 22px;
  line-height: 0.8; /* Improved line spacing */
  position: relative; /* Changed from absolute */
  top: -20px;
  left: -50px;

  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
`;

// Quick Links - Center Aligned but Left-aligned Internally
const QuickLinksContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 50px;
  marginLeft: 600px


  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  margin: 6px 0;
  transition: 0.3s;

  &:hover {
    color: rgb(70, 55, 46);
  }
`;

// Social Icons - Right Aligned
const SocialIconsContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    margin-top: 20px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialIcon = styled.a`
  font-size: 30px;
  color: white;
  transition: 0.3s;

  &:hover {
    color: rgb(204, 92, 22);
  }
`;

// Image Below Social Media Icons
const FooterImage = styled.img`
  margin-top: 80px;
  width: 200px;
  height: auto;

  @media (max-width: 768px) {
    width: 80px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <TopSection>
        {/* Address Section - Left Aligned */}
        <Address>
          <h3>Our Office</h3>
          <p>123 Pet Street, New Delhi, India</p>
          <p>Email: contact@petworld.com</p>
          <p>Phone: +91 98765 43210</p>
        </Address>

        {/* Quick Links - Center Aligned but Left-aligned Internally */}
        <QuickLinksContainer>
          <QuickLinks>
            <Link href="#">HOME</Link>
            <Link href="#">VIRTUAL ADOPT</Link>
            <Link href="#">PETINSTA</Link>
          </QuickLinks>
          <QuickLinks>
            <Link href="#">ADOPTION</Link>
            <Link href="#">WOOFAI</Link>
            <Link href="#">STORE</Link>
          </QuickLinks>
        </QuickLinksContainer>

        {/* Social Media Icons - Right Aligned */}
        <SocialIconsContainer>
          <SocialIcons>
            <SocialIcon href="https://instagram.com" target="_blank">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://facebook.com" target="_blank">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="https://pinterest.com" target="_blank">
              <FaPinterest />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" target="_blank">
              <FaYoutube />
            </SocialIcon>
          </SocialIcons>

          {/* Image Below Social Icons */}
          <FooterImage src={footer} alt="Pet World Logo" />
        </SocialIconsContainer>
      </TopSection>
    </FooterContainer>
  );
};

export default Footer;