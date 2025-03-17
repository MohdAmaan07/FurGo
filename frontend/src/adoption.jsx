import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBirthdayCake,
  faPaw,
  faMapMarkerAlt,
  faDog,
  faCat,
  faDove,
  faQuestionCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import dog6 from './assets/dog6.png';

import TopNavbar from "./TNav";
import Footer from "./footer";
import BottomNav from "./BNav";
import FAQSection from "./adopt";

const AdoptionPage = () => {
  const [filters, setFilters] = useState({
    age: "",
    type: "",
    location: "",
  });
  const [selectedPet, setSelectedPet] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for pets
  const pets = [
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      age: "2 years",
      vaccinated: "Yes",
      habits: "Friendly, Loves to play",
      additionals: "Good with kids",
      owner: "John Doe",
      contact: "+1234567890",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Whiskers",
      type: "Cat",
      age: "1 year",
      vaccinated: "Yes",
      habits: "Calm, Loves to sleep",
      additionals: "Prefers quiet environments",
      owner: "Jane Smith",
      contact: "+0987654321",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Tweety",
      type: "Birds",
      age: "6 months",
      vaccinated: "Yes",
      habits: "Loves to sing",
      additionals: "Needs a spacious cage",
      owner: "Alice Johnson",
      contact: "+1122334455",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 4,
      name: "Rocky",
      type: "Other",
      age: "4 years",
      vaccinated: "Yes",
      habits: "Loves to explore",
      additionals: "Requires outdoor space",
      owner: "Bob Brown",
      contact: "+5566778899",
      image: "https://via.placeholder.com/300",
    },
    // Add more pets as needed
  ];

  // Indian cities for location filter
  const indianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Visakhapatnam",
    "Indore",
    "Thane",
    "Bhopal",
    "Patna",
    "Vadodara",
    "Ghaziabad",
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const handleCardClick = (pet) => {
    setSelectedPet(pet);
  };

  const closeDetails = () => {
    setSelectedPet(null);
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log("Search Query:", searchQuery);
  };

  // Filter pets based on selected filters and search query
  const filteredPets = pets.filter((pet) => {
    return (
      (filters.age === "" || pet.age === filters.age) &&
      (filters.type === "" || pet.type === filters.type) &&
      (filters.location === "" || pet.owner.includes(filters.location)) &&
      (searchQuery === "" || pet.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // React Slick settings
  const sliderSettings = {
    dots: true,
    infinite: filteredPets.length > 3, // Disable infinite scroll if fewer than 3 pets
    speed: 500,
    slidesToShow: 3, // Show 3 cards at once
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: "0", // No extra padding around the centered card
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 cards on medium screens
          centerMode: true,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 card on smaller screens
          centerMode: true,
          centerPadding: "0",
        },
      },
    ],
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <AdoptionPageContainer>
        {/* Image in the top-left corner */}
        <TopLeftImage src={dog6} alt="Logo" />

        {/* Search Bar */}
        <SearchBarContainer>
          <SearchInputContainer>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <SearchInput
              type="text"
              placeholder="Search pets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInputContainer>
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </SearchBarContainer>

        {/* Filters Navbar */}
        <FiltersNavbar>
          <Filter>
            <FontAwesomeIcon icon={faBirthdayCake} className="filter-icon" />
            <label>Age:</label>
            <select onChange={(e) => handleFilterChange("age", e.target.value)}>
              <option value="">All</option>
              <option value="0-6 months">0-11 months</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
              <option value="3 years">3 years</option>
              <option value="4 years">4 years</option>
              <option value="More than 4 years">More than 4 years</option>
            </select>
          </Filter>
          <Filter>
            <FontAwesomeIcon icon={faPaw} className="filter-icon" />
            <label>Type:</label>
            <select onChange={(e) => handleFilterChange("type", e.target.value)}>
              <option value="">All</option>
              <option value="Dog">
                <FontAwesomeIcon icon={faDog} /> Dog
              </option>
              <option value="Cat">
                <FontAwesomeIcon icon={faCat} /> Cat
              </option>
              <option value="Birds">
                <FontAwesomeIcon icon={faDove} /> Birds
              </option>
              <option value="Other">
                <FontAwesomeIcon icon={faQuestionCircle} /> Other
              </option>
            </select>
          </Filter>
          <Filter>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="filter-icon" />
            <label>Location:</label>
            <select
              onChange={(e) => handleFilterChange("location", e.target.value)}
            >
              <option value="">All</option>
              {indianCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </Filter>
        </FiltersNavbar>

        {/* Page Heading */}
        <PageHeading>Find Your Perfect Little Buddy</PageHeading>

        {/* Carousel of Cards */}
        <CardsCarousel>
          <Slider {...sliderSettings}>
            {filteredPets.map((pet) => (
              <div key={pet.id}>
                <PetCard onClick={() => handleCardClick(pet)}>
                  <CardImage style={{ backgroundImage: `url(${pet.image})` }}>
                    <PetImageFrame />
                  </CardImage>
                  <PetInfo>
                    <p>Age: {pet.age}</p>
                    <p>Type: {pet.type}</p>
                  </PetInfo>
                </PetCard>
              </div>
            ))}
          </Slider>
        </CardsCarousel>

        {/* Detailed View Modal */}
        {selectedPet && (
          <PetDetailsModal>
            <ModalContent>
              <CloseButton onClick={closeDetails}>&times;</CloseButton>
              <DetailsContainer>
                <PetImage>
                  <img src={selectedPet.image} alt={selectedPet.name} />
                </PetImage>
                <ModalPetInfo>
                  <h2>{selectedPet.name}</h2>
                  <p>
                    <strong>Type:</strong> {selectedPet.type}
                  </p>
                  <p>
                    <strong>Age:</strong> {selectedPet.age}
                  </p>
                  <p>
                    <strong>Vaccinated:</strong> {selectedPet.vaccinated}
                  </p>
                  <p>
                    <strong>Habits:</strong> {selectedPet.habits}
                  </p>
                  <p>
                    <strong>Additionals:</strong> {selectedPet.additionals}
                  </p>
                  <hr />
                  <p>
                    <strong>Owner:</strong> {selectedPet.owner}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedPet.contact}
                  </p>
                </ModalPetInfo>
              </DetailsContainer>
              <ActionButtons>
                <ContactButton>Contact</ContactButton>
                <LocationButton>Location</LocationButton>
              </ActionButtons>
            </ModalContent>
          </PetDetailsModal>
        )}
        <FAQSection />
      </AdoptionPageContainer>
      <Footer />
    </>
  );
};

export default AdoptionPage;

// Styled Components
const AdoptionPageContainer = styled.div`
  font-family: "Montaga", serif;
  padding: 0px;
  margin-bottom: 70px; /* Reduced gap between carousel and footer */
  position: relative; /* Added for positioning the top-left image */
`;

const TopLeftImage = styled.img`
  position: absolute;
  top: 30px;
  left: 140px;
  width: 200px; /* Adjust size as needed */
  height: auto;
  z-index: 10; /* Ensure it's above other elements */
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 10px;

  .search-icon {
    font-size: 18px;
    color: #555;
    margin-right: 10px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ff6600;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e65c00;
  }
`;

const FiltersNavbar = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: rgb(238, 133, 63);
  padding: 10px;
  border-radius: 8px;
  margin: 0 20px;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .filter-icon {
    font-size: 18px;
    color: #555;
  }

  label {
    font-weight: bold;
  }

  select {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const PageHeading = styled.h1`
  text-align: center;
  margin: 50px 0; /* Reduced margin */
  font-size: 45px;
  color: black;
`;

const CardsCarousel = styled.div`
  margin: 0 140px; /* Adjusted margin */
`;

const PetCard = styled.div`
  width: 310px; /* Adjust width as needed */
  height: 410px; /* Adjust height as needed */
  background-color: rgb(72, 210, 245);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin: 0 10px; /* Adjusted margin */
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
`;

const PetImageFrame = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border: 8px solid orange;
  border-radius: 50%;
`;

const PetInfo = styled.div`
  padding: 15px;
  text-align: center;
  font-size: 40px
  background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
`;

const PetDetailsModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  max-width: 800px;
  position: relative;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #555;
`;

const DetailsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const PetImage = styled.div`
  flex: 1;

  img {
    width: 100%;
    border-radius: 8px;
  }
`;

const ModalPetInfo = styled.div`
  flex: 2;
  padding-left: 20px;

  h2 {
    margin-top: 0;
    color: black;
  }

  p {
    margin: 10px 0;
    color: black;
  }
`;

const ActionButtons = styled.div`
  text-align: right;
  margin-top: 20px;
`;

const ContactButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #ff6600;
  color: #fff;
`;

const LocationButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  background-color: #ff6600;
  color: #fff;
`;