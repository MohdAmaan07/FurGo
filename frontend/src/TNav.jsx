import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    font-size: 20px;
    color: white;
    text-decoration: none;
    transition: 0.3s;
    cursor: pointer;
  }

  .nav-item:hover {
    color: black;
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

const LogoutButton = styled(Button)`
  border-color: red;
  &:hover {
    background: red;
    color: white;
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

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const TopNavbar = () => {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        await axios.post("http://localhost:8000/auth/jwt/verify/", { token });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token expired or invalid", error.response?.data || error.message);
        handleLogout();
      }
    };

    checkTokenValidity();
  }, []);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:8000/auth/users/", formData);
      toast.success("Account created! Check your email to verify.", { position: "top-right" });
      setSignUpOpen(false);
    } catch (error) {
      console.error("Sign Up Error", error.response?.data || error.message);
      setError(
        error.response?.data?.detail || "Sign-up failed. Please check your details."
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://localhost:8000/auth/jwt/create/", loginData);
      localStorage.setItem("token", response.data.access);
      toast.success("Login Successful!", { position: "top-right" });
      setIsAuthenticated(true);
      setLoginOpen(false); // Close modal on successful login
    } catch (error) {
      console.error("Login Error", error.response?.data || error.message);
      setError(
        error.response?.data?.detail || "Login failed! Check your username and password."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully!", { position: "top-right" });
    setIsAuthenticated(false);
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
          {!isAuthenticated ? (
            <>
              <Button onClick={() => setLoginOpen(true)}>Login</Button>
              <Button onClick={() => setSignUpOpen(true)}>Sign Up</Button>
            </>
          ) : (
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          )}
        </div>
      </Navbar>

      {/* Sign Up Modal */}
      <ModalOverlay $isOpen={signUpOpen}>
        <ModalContent>
          <CloseButton onClick={() => setSignUpOpen(false)}>&times;</CloseButton>
          <h2>Sign Up</h2>
          {error && <ErrorText>{error}</ErrorText>}
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

      {/* Login Modal */}
      <ModalOverlay $isOpen={loginOpen}>
        <ModalContent>
          <CloseButton onClick={() => setLoginOpen(false)}>&times;</CloseButton>
          <h2>Login</h2>
          {error && <ErrorText>{error}</ErrorText>}
          <form onSubmit={handleLogin}>
            <Input type="text" name="username" placeholder="Username" onChange={handleLoginChange} required />
            <Input type="password" name="password" placeholder="Password" onChange={handleLoginChange} required />
            <SubmitButton type="submit">Login</SubmitButton>
          </form>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default TopNavbar;
