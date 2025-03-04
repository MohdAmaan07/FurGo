import React, { useState } from "react";
import styled from "styled-components";
import {
  faEnvelope,
  faPhone,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faPinterestP,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Styled Components
const TopBar = styled.div`
  background: #0077b6;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  font-size: 14px;

  .left,
  .right {
    display: flex;
    align-items: center;
  }

  .item {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }

  .icon {
    margin-right: 8px;
  }

  .divider {
    height: 18px;
    width: 1px;
    background: white;
    margin: 0 10px;
  }

  .social-icons svg {
    margin: 0 5px;
    cursor: pointer;
    transition: 0.3s;
  }

  .social-icons svg:hover {
    color: #ffdd00;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 10px;
  }
`;

const Navbar = styled.nav`
  background: #00a9a5;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;

  .logo img {
    width: 75px;
    height: auto;
    margin-right: 10px;
  }

  .nav-links {
    display: flex;
    align-items: center;
  }

  .nav-item {
    margin-right: 20px;
    cursor: pointer;
    font-size: 18px;
    transition: 0.3s;
    font-weight: 400;
  }

  .nav-item:hover {
    color: black;
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background: #0077b6;
      padding: 20px;
      z-index: 100;
    }

    .nav-links.active {
      display: flex;
    }

    .nav-item {
      margin: 10px 0;
    }
  }
`;

const Button = styled.button`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 8px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  margin-left: 10px;

  &:hover {
    background: orange;
    color: black;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MenuButton = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: #0077b6;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: orange;
  }
`;

const ToggleLink = styled.p`
  color: #0077b6;
  cursor: pointer;
  margin-top: 10px;
  text-decoration: underline;

  &:hover {
    color: orange;
  }
`;

const TopNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleForgotPassword = () => {
    setSignInOpen(false);
    setForgotPasswordOpen(true);
  };

  const handleResetPassword = () => {
    setForgotPasswordOpen(false);
    setResetPasswordOpen(true);
  };

  const toggleModals = () => {
    setSignUpOpen(!signUpOpen);
    setSignInOpen(!signInOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <TopBar>
        <div className="left">
          <div className="item">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            contact@furgo.com
          </div>
          <div className="divider"></div>
          <div className="item">
            <FontAwesomeIcon icon={faPhone} className="icon" />
            +91 9876543210
          </div>
        </div>

        <div className="right social-icons">
          <FontAwesomeIcon icon={faFacebookF} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faPinterestP} />
        </div>
      </TopBar>

      {/* Main Navbar */}
      <Navbar>
        <div className="logo">
          <a href="/">
            <img src="/FurGo.png" alt="FurGo Logo" />
          </a>
        </div>

        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </MenuButton>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <div className="nav-item">VirtualAdopt</div>
          <div className="nav-item">WoofAI</div>
          <div className="nav-item">Donate</div>
          <Button onClick={() => setSignInOpen(true)}>Sign In</Button>
          <Button onClick={() => setSignUpOpen(true)}>Sign Up</Button>
        </div>
      </Navbar>

      {/* Sign Up Modal */}
      <ModalOverlay isOpen={signUpOpen}>
        <ModalContent>
          <CloseButton onClick={() => setSignUpOpen(false)}>&times;</CloseButton>
          <h2>Sign Up</h2>
          <Input type="text" placeholder="Full Name" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />
          <SubmitButton>Register</SubmitButton>
          <ToggleLink onClick={toggleModals}>
            Already have an account? Sign In
          </ToggleLink>
        </ModalContent>
      </ModalOverlay>

      {/* Sign In Modal */}
      <ModalOverlay isOpen={signInOpen}>
        <ModalContent>
          <CloseButton onClick={() => setSignInOpen(false)}>&times;</CloseButton>
          <h2>Sign In</h2>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <ToggleLink onClick={handleForgotPassword}>Forgot Password?</ToggleLink>
          <SubmitButton>Login</SubmitButton>
          <ToggleLink onClick={toggleModals}>
            Don't have an account? Sign Up
          </ToggleLink>
        </ModalContent>
      </ModalOverlay>

      {/* Forgot Password Modal */}
      <ModalOverlay isOpen={forgotPasswordOpen}>
        <ModalContent>
          <CloseButton onClick={() => setForgotPasswordOpen(false)}>
            &times;
          </CloseButton>
          <h2>Reset Password</h2>
          <Input type="email" placeholder="Enter your email" />
          <SubmitButton onClick={handleResetPassword}>
            Send Reset Code
          </SubmitButton>
        </ModalContent>
      </ModalOverlay>

      {/* Reset Password Modal */}
      <ModalOverlay isOpen={resetPasswordOpen}>
        <ModalContent>
          <CloseButton onClick={() => setResetPasswordOpen(false)}>
            &times;
          </CloseButton>
          <h2>Reset Password</h2>
          <Input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <Input type="password" placeholder="New Password" />
          <Input type="password" placeholder="Confirm New Password" />
          <SubmitButton>Reset Password</SubmitButton>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default TopNavbar;