import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultImg from "./assets/default.jpeg";
import TopNavbar from "./TNav";
import Footer from "./footer";

const PetDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pet = location.state?.pet;

  if (!pet) {
    return <h2>No pet details available</h2>;
  }

  return (
    <>
      <TopNavbar />
      <Container>
        <PetImage
          src={pet.photos && pet.photos.length > 0 ? pet.photos[0].large : DefaultImg}
          alt={pet.name}
        />
        <InfoContainer>
          <h2>{pet.name}</h2>
          <p><strong>Age:</strong> {pet.age}</p>
          <p><strong>Type:</strong> {pet.type}</p>
          <p><strong>Breed:</strong> {pet.breeds?.primary || "Unknown"}</p>
          <p><strong>Location:</strong> {pet.contact?.address?.city}, {pet.contact?.address?.state}</p>
          <p><strong>Description:</strong> {pet.description || "No description available."}</p>
          <h3>Owner Contact Details</h3>
          <p><strong>Email:</strong> {pet.contact?.email || "Not provided"}</p>
          <p><strong>Phone:</strong> {pet.contact?.phone || "Not provided"}</p>
          <BackButton onClick={() => navigate(-1)}>Go Back</BackButton>
        </InfoContainer>
      </Container>
      <Footer />
    </>
  );
};

export default PetDetails;

/* Styled Components */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const PetImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  max-width: 600px;
  margin-top: 20px;
  text-align: left;
`;

const BackButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 10px;
`;
