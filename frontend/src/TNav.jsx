import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import styled from "styled-components";
import axios from "axios";
import logo from "./assets/FurGo.png";

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
  }

  .nav-links {
    display: flex;
    align-items: center;
  }

  .nav-item {
    margin-right: 20px;
    cursor: pointer;
    font-size: 20px;
    transition: 0.3s;
    color: white; /* Default color */
    text-decoration: none; /* Remove underline */
  }

  .nav-item:hover {
    color: black; /* Hover color */
  }
`;

const Button = styled.button`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  margin-left: 10px;

  &:hover {
    background: orange;
    color: black;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
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
  font-size: 20px;
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

const TopNavbar = () => {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/users/", formData);
      console.log("Sign Up Success", response.data);
      setSignUpOpen(false);
    } catch (error) {
      console.error("Sign Up Error", error.response.data);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/token/login/", signInData);
      console.log("Sign In Success", response.data);
      setSignInOpen(false);
    } catch (error) {
      console.error("Sign In Error", error.response.data);
    }
  };

  return (
    <>
      <Navbar>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="FurGo Logo" />
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/virtualadopt" className="nav-item">
            VirtualAdopt
          </Link>
          <Link to="/woofai" className="nav-item">
            WoofAI
          </Link>
          <Button onClick={() => setSignInOpen(true)}>Sign In</Button>
          <Button onClick={() => setSignUpOpen(true)}>Sign Up</Button>
        </div>
      </Navbar>

      {/* Sign Up Modal */}
      <ModalOverlay $isOpen={signUpOpen}>
        <ModalContent>
          <CloseButton onClick={() => setSignUpOpen(false)}>&times;</CloseButton>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <Input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
            <Input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
            <Input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <SubmitButton type="submit">Register</SubmitButton>
          </form>
        </ModalContent>
      </ModalOverlay>

      {/* Sign In Modal */}
      <ModalOverlay $isOpen={signInOpen}>
        <ModalContent>
          <CloseButton onClick={() => setSignInOpen(false)}>&times;</CloseButton>
          <h2>Sign In</h2>
          <form onSubmit={handleSignIn}>
            <Input type="email" name="email" placeholder="Email" onChange={handleSignInChange} required />
            <Input type="password" name="password" placeholder="Password" onChange={handleSignInChange} required />
            <SubmitButton type="submit">Login</SubmitButton>
          </form>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default TopNavbar;