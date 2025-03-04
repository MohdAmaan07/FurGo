import React from "react";
import styled from "styled-components";
import { FaInstagram, FaFacebook, FaPinterest, FaTwitter, FaYoutube } from "react-icons/fa";

// Styled Components
const FooterContainer = styled.footer`
  background: #00a9a5;
  color: white;
  padding: 50px 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;
  font-family: "Montaga", serif;

  @media (max-width: 768px) {
    padding: 30px 5%;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 30px;
  }
`;

const Address = styled.div`
  width: 25%;
  text-align: left;
  font-size: 19px;
  color: black;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const QuickLinksContainer = styled.div`
  display: flex;
  gap: 40px;
  width: 40%;
  justify-content: center;

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
  align-items: flex-start;
  text-align: left;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  margin: 6px 0;
  transition: 0.3s;

  &:hover {
    color: rgb(102, 236, 234);
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  width: 25%;
  justify-content: flex-end;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  font-size: 30px;
  color: white;
  transition: 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    color: rgb(102, 236, 234);
  }

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      {/* Top Section */}
      <TopSection>
        {/* Left: Address */}
        <Address>
          <h3>Our Office</h3>
          <p>123 Pet Street, New Delhi, India</p>
          <p>Email: contact@petworld.com</p>
          <p>Phone: +91 98765 43210</p>
        </Address>

        {/* Center: Two Columns of Quick Links */}
        <QuickLinksContainer>
          <QuickLinks>
            <Link href="#">HOME</Link>
            <Link href="#">VIRTUAL ADOPT</Link>
            <Link href="#">PETINSTA</Link>
            <Link href="#">DONATE</Link>

          </QuickLinks>
          <QuickLinks>
            <Link href="#">ADOPTION</Link>
            <Link href="#">WOOFAI</Link>
            <Link href="#">STORE</Link>
          </QuickLinks>
        </QuickLinksContainer>

        {/* Right: Social Media Icons */}
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
      </TopSection>
    </FooterContainer>
  );
};

export default Footer;