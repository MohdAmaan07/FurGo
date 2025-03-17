import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaSearch, FaFilter, FaMicrophone, FaStopCircle } from 'react-icons/fa';
import dog1 from './assets/dog1.jpeg';
import dog2 from './assets/dog2.jpeg';
import dog3 from './assets/dog3.jpeg';
import backgroundImage from './assets/background1.jpg'; // Import the background image
import BottomNav from './BNav';
import Footer from './footer';
import PhotoCollage from './photo';
import DogShadowComponent from './foot';
import ImageGrid from './imagegrid';
import TopNavbar from './TNav';

const KnowYourPet = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeFilter, setActiveFilter] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const petData = [
        {
          type: 'Dog',
          breed: 'Golden Retriever',
          foodHabits: 'Omnivore',
          climate: 'Temperate',
          nature: 'Friendly',
          lifespan: '10-12 years',
          allergies: 'Pollen, dust',
          avoidFood: 'Chocolate, grapes',
          additionalInfo: 'Great family pet',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Cat',
          breed: 'Siamese',
          foodHabits: 'Carnivore',
          climate: 'Warm',
          nature: 'Social',
          lifespan: '15-20 years',
          allergies: 'Dust, mold',
          avoidFood: 'Raw eggs, caffeine',
          additionalInfo: 'Very talkative',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Bird',
          breed: 'Macaw',
          foodHabits: 'Herbivore',
          climate: 'Tropical',
          nature: 'Intelligent',
          lifespan: '50-70 years',
          allergies: 'Avocado, caffeine',
          avoidFood: 'Chocolate, dairy',
          additionalInfo: 'Can mimic speech',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Fish',
          breed: 'Goldfish',
          foodHabits: 'Omnivore',
          climate: 'Freshwater',
          nature: 'Peaceful',
          lifespan: '10-15 years',
          allergies: 'None',
          avoidFood: 'Bread, processed foods',
          additionalInfo: 'Requires clean water and proper tank setup',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Rabbit',
          breed: 'Holland Lop',
          foodHabits: 'Herbivore',
          climate: 'Temperate',
          nature: 'Gentle',
          lifespan: '7-10 years',
          allergies: 'Certain types of hay',
          avoidFood: 'Iceberg lettuce, chocolate',
          additionalInfo: 'Loves to chew and dig',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Others',
          breed: 'Guinea Pig',
          foodHabits: 'Herbivore',
          climate: 'Temperate',
          nature: 'Social',
          lifespan: '4-8 years',
          allergies: 'Certain vegetables',
          avoidFood: 'Dairy, meat',
          additionalInfo: 'Requires vitamin C supplements',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Others',
          breed: 'Hamster',
          foodHabits: 'Omnivore',
          climate: 'Temperate',
          nature: 'Curious',
          lifespan: '2-3 years',
          allergies: 'Certain seeds',
          avoidFood: 'Citrus fruits, onions',
          additionalInfo: 'Loves to run on wheels',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Others',
          breed: 'Turtle',
          foodHabits: 'Omnivore',
          climate: 'Aquatic/Terrestrial',
          nature: 'Calm',
          lifespan: '20-40 years',
          allergies: 'None',
          avoidFood: 'Processed foods, dairy',
          additionalInfo: 'Requires both water and dry land',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Others',
          breed: 'Ferret',
          foodHabits: 'Carnivore',
          climate: 'Temperate',
          nature: 'Playful',
          lifespan: '6-10 years',
          allergies: 'Certain grains',
          avoidFood: 'Fruits, vegetables',
          additionalInfo: 'Loves to explore and hide',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Others',
          breed: 'Chinchilla',
          foodHabits: 'Herbivore',
          climate: 'Cool',
          nature: 'Timid',
          lifespan: '10-20 years',
          allergies: 'Certain dust',
          avoidFood: 'Sugary foods, nuts',
          additionalInfo: 'Requires dust baths',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Others',
          breed: 'Hedgehog',
          foodHabits: 'Omnivore',
          climate: 'Temperate',
          nature: 'Shy',
          lifespan: '4-6 years',
          allergies: 'Certain insects',
          avoidFood: 'Citrus fruits, dairy',
          additionalInfo: 'Nocturnal and loves to curl up',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Others',
          breed: 'Sugar Glider',
          foodHabits: 'Omnivore',
          climate: 'Tropical',
          nature: 'Social',
          lifespan: '10-15 years',
          allergies: 'Certain fruits',
          avoidFood: 'Chocolate, caffeine',
          additionalInfo: 'Loves to glide and bond with owners',
          images: [dog1, dog2, dog3],
        },
        {
          type: 'Others',
          breed: 'Hermit Crab',
          foodHabits: 'Omnivore',
          climate: 'Tropical',
          nature: 'Shy',
          lifespan: '10-15 years',
          allergies: 'None',
          avoidFood: 'Salty foods, processed foods',
          additionalInfo: 'Requires a humid environment',
          images: [dog1, dog2, dog3],
        },
      
  ];

  const filteredPets = petData.filter(
    (pet) =>
      (!activeFilter || pet.type.toLowerCase() === activeFilter.toLowerCase()) &&
      (!searchQuery || pet.type.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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
        <FaSearch style={{ color: '#555' }} />
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
              {['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit', 'Others'].map((filter) => (
                <div
                  key={filter}
                  style={styles.filterOption}
                  onClick={() => {
                    setActiveFilter(filter);
                    setShowFilterDropdown(false);
                  }}
                >
                  {filter}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pet Carousel */}
      <div style={styles.carouselContainer}>
        <Slider {...settings} style={styles.carousel}>
          {filteredPets.map((pet, index) => (
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
                <img
                  src={selectedPet.images[1]}
                  alt="Pet 1"
                  style={styles.smallImage}
                />
                <img
                  src={selectedPet.images[2]}
                  alt="Pet 2"
                  style={styles.smallImage}
                />
              </div>
            </div>

            {/* Right Side: Information */}
            <div style={styles.infoContainer}>
              <h2>{selectedPet.type}</h2>
              <p>
                <strong>Breed:</strong> {selectedPet.breed}
              </p>
              <p>
                <strong>Food Habits:</strong> {selectedPet.foodHabits}
              </p>
              <p>
                <strong>Climate:</strong> {selectedPet.climate}
              </p>
              <p>
                <strong>Nature:</strong> {selectedPet.nature}
              </p>
              <p>
                <strong>Lifespan:</strong> {selectedPet.lifespan}
              </p>
              <p>
                <strong>Allergies:</strong> {selectedPet.allergies}
              </p>
              <p>
                <strong>Avoid Food:</strong> {selectedPet.avoidFood}
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
      <ImageGrid />
    </div>
    <Footer />
    </>
  );
};

// Function to get background color based on pet type
const getColorByType = (type) => {
  const colors = {
    Dog: '#FFD700',
    Cat: '#FF6347',
    Bird: '#32CD32',
    Fish: '#1E90FF',
    Rabbit: '#FF69B4',
    Others: '#D3D3D3',
  };
  return colors[type] || '#FFFFFF';
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