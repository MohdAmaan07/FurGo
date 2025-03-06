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
} from "@fortawesome/free-solid-svg-icons";

import TopNavbar from "./TNav";
import Footer from "./footer";
import BottomNav from "./BNav";

const AdoptionPage = () => {
  const [filters, setFilters] = useState({
    age: "",
    type: "",
    location: "",
  });
  const [selectedPet, setSelectedPet] = useState(null);

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

  // Filter pets based on selected filters
  const filteredPets = pets.filter((pet) => {
    return (
      (filters.age === "" || pet.age === filters.age) &&
      (filters.type === "" || pet.type === filters.type) &&
      (filters.location === "" || pet.owner.includes(filters.location))
    );
  });

  // React Slick settings
  const sliderSettings = {
    dots: true,
    infinite: filteredPets.length > 3, // Disable infinite scroll if fewer than 3 pets
    speed: 500,
    slidesToShow: Math.min(3, filteredPets.length), // Show up to 3 cards
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, filteredPets.length), // Show up to 2 cards
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Always show 1 card on smaller screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <div className="adoption-page">
        {/* Filters Navbar */}
        <div className="filters-navbar">
          <div className="filter">
            <FontAwesomeIcon icon={faBirthdayCake} className="filter-icon" />
            <label>Age:</label>
            <select onChange={(e) => handleFilterChange("age", e.target.value)}>
              <option value="">All</option>
              <option value="0-6 months">0-6 months</option>
              <option value="1 to 3 years">1 to 3 years</option>
              <option value="More than 3 years">More than 3 years</option>
            </select>
          </div>
          <div className="filter">
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
          </div>
          <div className="filter">
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
          </div>
        </div>

        {/* Page Heading */}
        <h1 className="page-heading">Find Your Perfect Pet</h1>

        {/* Carousel of Cards */}
        <div className="cards-carousel">
          <Slider {...sliderSettings}>
            {filteredPets.map((pet) => (
              <div key={pet.id}>
                <div
                  className="pet-card"
                  onClick={() => handleCardClick(pet)}
                >
                  <div
                    className="card-image"
                    style={{ backgroundImage: `url(${pet.image})` }}
                  >
                    <div className="pet-image-frame"></div>
                  </div>
                  <div className="pet-info">
                    <p>Age: {pet.age}</p>
                    <p>Type: {pet.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Detailed View Modal */}
        {selectedPet && (
          <div className="pet-details-modal">
            <div className="modal-content">
              <span className="close-button" onClick={closeDetails}>
                &times;
              </span>
              <div className="details-container">
                <div className="pet-image">
                  <img src={selectedPet.image} alt={selectedPet.name} />
                </div>
                <div className="pet-info">
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
                </div>
              </div>
              <div className="action-buttons">
                <button className="contact-button">Contact</button>
                <button className="location-button">Location</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />

      {/* Inline CSS */}
      <style>{`
        .adoption-page {
  font-family: "Montaga", serif;
          padding: 0px;
          margin-bottom: -20px; /* Reduced gap between carousel and footer */
        }

        .filters-navbar {
          display: flex;
          justify-content: space-around;
          background-color:rgb(238, 133, 63);
          padding: 10px;
          border-radius: 8px;
          margin: 0 20px;
        }

        .filter {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filter-icon {
          font-size: 18px;
          color: #555;
        }

        .filter label {
          font-weight: bold;
        }

        .filter select {
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .page-heading {
          text-align: center;
          margin: 40px 0;
          font-size: 40px;
          color: #333;
        }

        .cards-carousel {
          margin: 0px 0;
          margin: 0 28px;
        }

        .slick-slide {
          padding: 0 10px; /* Add gap between cards */
        }

        .pet-card {
          width: 320px; /* Adjust width as needed */
          height: 400px; /* Adjust height as needed */
          background-color:rgb(36, 180, 247);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          margin-left: -20px;
        }

        .card-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .pet-image-frame {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 150px;
          height: 150px;
          border: 5px solid #fff;
          border-radius: 50%;
        }

        .pet-info {
          padding: 15px;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
        }

        .pet-details-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          width: 50%;
          max-width: 800px;
          position: relative;
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 24px;
          cursor: pointer;
          color: #555;
        }

        .details-container {
          display: flex;
          gap: 20px;
        }

        .pet-image {
          flex: 1;
        }

        .pet-image img {
          width: 100%;
          border-radius: 8px;
        }

        .pet-info {
          flex: 2;
          padding-left: 20px;
        }

        .pet-info h2 {
          margin-top: 0;
          color: black;
        }

        .pet-info p {
          margin: 10px 0;
          color: black;
        }

        .action-buttons {
          text-align: right;
          margin-top: 20px;
        }

        .contact-button,
        .location-button {
          padding: 10px 20px;
          margin-left: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .contact-button {
          background-color: #ff6600;
          color: #fff;
        }

        .location-button {
          background-color: #ff6600;
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default AdoptionPage;