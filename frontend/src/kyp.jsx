import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSearch, FaFilter, FaMicrophone, FaStopCircle } from "react-icons/fa";
import backgroundImage from "./assets/background1.jpg";
import BottomNav from "./BNav";
import Footer from "./footer";
import TopNavbar from "./TNav";

const getBaseUrl = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8000'
    : 'https://furgo.onrender.com';
};

const KnowYourPet = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPet, setSelectedPet] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [petData, setPetData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Use dynamic base URL instead of hardcoded one
        let url = `${getBaseUrl()}/pets/petfinder/`;
  
        if (searchQuery) {
          url += `?animal_type=${searchQuery}`;
        }
  
        const response = await axios.get(url);
  
        const petsWithPhotos = response.data
          .filter((pet) => pet.photos && pet.photos.length > 0)
          .map((pet) => ({
            type: pet.type,
            breed: pet.breeds.primary || "Unknown",
            additionalInfo: pet.description || "No additional info",
            images: pet.photos.map((photo) => photo.full),
          }));
  
        setPetData(petsWithPhotos);
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };
  
    fetchPets();
  }, [searchQuery]);
  
  

  const handleVoiceTranslation = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleStopVoice = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const settings = {
    dots: true,
    infinite: petData.length > 3,
    speed: 500,
    slidesToShow: petData.length < 3 ? petData.length : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <div style={{ ...styles.pageContainer, backgroundImage: `url(${backgroundImage})` }}>
        <h1 style={styles.heading}>Know Your Pet</h1>

        {/* Search & Filters */}
        <div style={styles.searchBar}>
          <FaSearch style={{ color: "#555" }} />
          <input
            type="text"
            placeholder="Search for a pet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <div style={styles.filterDropdown}>
            <FaFilter
              style={styles.filterIcon}
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            />
            {showFilterDropdown && (
              <div style={styles.filterOptions}>
                {["Dog", "Cat", "Bird", "Fish", "Rabbit", "Others"].map((type) => (
                  <div
                    key={type}
                    style={styles.filterOption}
                    onClick={() => {
                      setFilter(type);
                      setShowFilterDropdown(false);
                    }}
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pet Carousel */}
        <div style={styles.carouselContainer}>
          <Slider {...settings} style={styles.carousel}>
            {petData.map((pet, index) => (
              <div
                key={index}
                style={{ ...styles.petCard, background: getColorByType(pet.type) }}
                onClick={() => setSelectedPet(pet)}
              >
                <div style={styles.circularFrame}>
                  <img src={pet.images[0]} alt={pet.type} style={styles.carouselImage} />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Pet Info Section */}
        {selectedPet && (
          <div style={styles.petInfoContainer}>
            <div style={styles.petInfo}>
              {/* Left Side: Images */}
              <div style={styles.imageContainer}>
                <img
                  src={selectedPet.images[0]}
                  alt="Main Pet"
                  style={styles.largeImage}
                />
                <div style={styles.smallImagesContainer}>
                  {selectedPet.images.slice(1, 4).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Pet ${index + 1}`}
                      style={styles.smallImage}
                    />
                  ))}
                </div>
              </div>

              {/* Right Side: Information */}
              <div style={styles.infoContainer}>
                <h2>{selectedPet.type}</h2>
                <p>
                  <strong>Type:</strong> {selectedPet.type}
                </p>
                <p>
                  <strong>Breed:</strong> {selectedPet.breed}
                </p>
                <p>
                  <strong>Additional Info:</strong> {selectedPet.additionalInfo}
                </p>

                {/* Voice Icons */}
                <div style={styles.micContainer}>
                  <div
                    style={styles.micButton}
                    onClick={() => handleVoiceTranslation(JSON.stringify(selectedPet))}
                  >
                    <FaMicrophone style={styles.micIcon} />
                  </div>
                  {isSpeaking && (
                    <FaStopCircle style={styles.stopIcon} onClick={handleStopVoice} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

// Function to get background color based on pet type
const getColorByType = (type) => {
  const colors = {
    Dog: "#FFD700",
    Cat: "#FF6347",
    Bird: "#32CD32",
    Fish: "#1E90FF",
    Rabbit: "#FF69B4",
    Others: "#D3D3D3",
  };
  return colors[type] || "#FFFFFF";
};

// Styles
const styles = {
  pageContainer: {
    fontFamily: 'Montaga',
    textAlign: 'center',
    maxWidth: '1330px',
    margin: '0 auto',
    padding: '20px',
    backgroundSize: 'cover',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '3.5rem',
    color: 'rgb(0, 0, 0)',
    marginBottom: '40px'
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center the search bar and filter icon
    gap: '10px',
    padding: '10px',
    backgroundColor: 'rgb(223, 114, 245)',
    borderRadius: '10px',
    width: '730px',
    height: '35px',
    marginBottom: '50px', // Increased gap between search bar and carousel
    margin: '0 auto', // Center the search bar horizontally
  },
  searchInput: {
    padding: '10px',
    width: '600px',
    border: '2px solid #ccc',
    borderRadius: '10px',
  },
  filterDropdown: {
    position: 'relative',
  },
  filterIcon: {
    cursor: 'pointer',
    fontSize: '1.4rem',
    color: '#555',
  },
  filterOptions: {
    position: 'absolute',
    top: '30px',
    right: '0',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  },
  filterOption: {
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
  },
  carouselContainer: {
    marginTop: '80px',
    marginBottom: '50px' // Add margin to create a gap between search bar and carousel
  },
  petCard: {
    borderRadius: '10px',
    padding: '20px',
    color: 'black',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
  },
  circularFrame: {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '0 auto',
    border: '6px solid orange',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  petInfoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  petInfo: {
    backgroundColor: ' #fc9657',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '800px',
    display: 'flex',
    gap: '40px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontSize: '19px',
    marginTop: '50px',
    marginBottom: '5px'
  },
  imageContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  largeImage: {
    width: '450px',
    height: '350px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  smallImagesContainer: {
    display: 'flex',
    gap: '13px',
  },
  smallImage: {
    width: '70%',
    height: '150px',
    borderRadius: '10px',
    objectFit: 'cover',
  },
  infoContainer: {
    flex: 1,
    textAlign: 'left',
  },
  micContainer: {
    marginTop: '40px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  micButton: {
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  micIcon: {
    color: '#fff',
    fontSize: '27px',
  },
  stopIcon: {
    fontSize: '35px',
    color: 'red',
    cursor: 'pointer',
  },
};

export default KnowYourPet;