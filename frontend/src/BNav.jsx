import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { FaStore, FaUsers, FaPaw, FaHeartbeat } from "react-icons/fa";
import { MdPets } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import FurGoLogo from "./assets/FurGo.png"; // Ensure this path is correct

// Styled Components
const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #f5f5dc; /* Soft beige background */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 0;
  height: 40px;
  z-index: 1000;

  @media (max-width: 768px) {
    height: 70px;
    padding: 10px 0;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${(props) => (props.active ? "#00A9A5" : "#666")};
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s;

  svg {
    font-size: 22px;
    margin-bottom: 4px;

    @media (max-width: 768px) {
      font-size: 26px;
    }
  }

  &:hover {
    color: #ff5733;
  }
`;

// Floating Menu Button
const MenuButton = styled.div`
  background: #00a9a5;
  color: white;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 0.3s;
  z-index: 20;

  svg {
    font-size: 36px;
  }

  &:hover {
    background: #ff8e72;
  }

  @media (max-width: 768px) {
    width: 65px;
    height: 65px;

    svg {
      font-size: 30px;
    }
  }

  @media (max-width: 480px) {
    width: 55px;
    height: 55px;

    svg {
      font-size: 26px;
    }
  }
`;

const BottomNav = () => {
  const location = useLocation(); // Get current route

  return (
    <>
      <NavBar>
      <NavItem to="/store" active={location.pathname === "/store"}>
          <FaStore />
          <span>Store</span>
        </NavItem>

        <NavItem to="/community" active={location.pathname === "/community"}>
        <FaUsers />
          <span>PetInsta</span>
        </NavItem>

        {/* Center Circular Menu Button */}
        <div style={{ position: "relative" }}>
          <MenuButton>
            <MdPets />
          </MenuButton>
        </div>

        <NavItem to="/adoption" active={location.pathname === "/adoption"}>
        <FaPaw />
          <span>Adoption</span>
        </NavItem>

        <NavItem to="/vet" active={location.pathname === "/vet"}>
        <FaHeartbeat />
          <span>Vet</span>
        </NavItem>
      </NavBar>
    </>
  );
};

export default BottomNav;