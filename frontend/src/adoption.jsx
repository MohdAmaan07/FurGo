import React, { useState, useEffect } from "react";
import axios from "axios";
import DefaultImg from "./assets/default.jpeg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faPaw,
  faMapMarkerAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import dog6 from "./assets/dog6.png";

import TopNavbar from "./TNav";
import Footer from "./footer";
import BottomNav from "./BNav";
import FAQSection from "./adopt";

const getBaseUrl = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8000'
    : 'https://furgo.onrender.com';
};

const AdoptionPage = () => {
  const [appliedSearch, setAppliedSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // pets state will hold the full list of pets fetched from the API
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 10; // Number of pets per page

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const params = {};
        if (appliedSearch) {
          params.animal_type = appliedSearch;
        }
        const response = await axios.get(`${getBaseUrl()}pets/petfinder/`, { params });
        // The API returns an array of pet objects.
        if (Array.isArray(response.data)) {
          setPets(response.data);
        } else if (Array.isArray(response.data.pets)) {
          setPets(response.data.pets);
        } else {
          setPets([]);
        }
        // Reset current page when new data is fetched.
        setCurrentPage(1);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setPets([]);
      }
    };

    fetchPets();
  }, [appliedSearch]);

  // Calculate total pages based on the full pets array
  const totalPages = Math.ceil(pets.length / petsPerPage) || 1;
  // Get the pets for the current page
  const currentPets = pets.slice(
    (currentPage - 1) * petsPerPage,
    currentPage * petsPerPage
  );

  const handleSearch = () => {
    setAppliedSearch(searchQuery);
    setCurrentPage(1);
    console.log("Search Query:", searchQuery);
  };

  // Pagination Handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <AdoptionPageContainer>
        <TopLeftImage src={dog6} alt="Logo" />

        {/* Search Bar */}
        <SearchBarContainer>
          <SearchInputContainer>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <SearchInput
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pets..."
            />
            <SearchButton onClick={handleSearch}>Search</SearchButton>
          </SearchInputContainer>
        </SearchBarContainer>

        {/* Pets List */}
        <PetsContainer>
          {currentPets.length > 0 ? (
            currentPets.map((pet) => (
              <PetCard key={pet.id}>
                <PetImage
                  src={
                    pet.photos && pet.photos.length > 0
                      ? pet.photos[0].medium
                      : DefaultImg
                  }
                  alt={pet.name}
                />
                <PetInfo>
                  <h3>{pet.name}</h3>
                  <p>
                    <FontAwesomeIcon icon={faBirthdayCake} /> Age: {pet.age}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPaw} /> Type: {pet.type}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Location:{" "}
                    {pet.contact?.address
                      ? `${pet.contact.address.city}, ${pet.contact.address.state}`
                      : "Unknown"}
                  </p>
                </PetInfo>
              </PetCard>
            ))
          ) : (
            <p>No pets available</p>
          )}
        </PetsContainer>

        {/* Pagination Controls */}
        <PaginationContainer>
          <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </PaginationButton>
          <PageIndicator>
            Page {currentPage} of {totalPages}
          </PageIndicator>
          <PaginationButton
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </PaginationButton>
        </PaginationContainer>
      </AdoptionPageContainer>
      <FAQSection />
      <Footer />
    </>
  );
};

export default AdoptionPage;

/* Styled Components */
const AdoptionPageContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const TopLeftImage = styled.img`
  width: 150px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 5px;
  padding: 5px;
`;

const SearchInput = styled.input`
  border: none;
  padding: 10px;
  font-size: 16px;
  outline: none;
`;

const SearchButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin-left: 10px;
`;

const PetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const PetCard = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const PetImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const PetInfo = styled.div`
  text-align: left;
  padding: 10px 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const PageIndicator = styled.span`
  font-size: 18px;
  margin: 0 10px;
`;
