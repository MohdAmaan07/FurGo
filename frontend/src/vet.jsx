import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaStethoscope, FaAward, FaPhone, FaUserMd } from 'react-icons/fa'; // Icons

import vet1 from "./assets/vet1.png";
import vet2 from "./assets/vet2.png";
import vet3 from "./assets/vet3.png";
import videoFile from "./assets/vetvideo (1).mp4"; // Import your video file
import Footer from './footer';
import TopNavbar from './TNav';
import BottomNav from './BNav';

// Import images for the team cards
import doc1 from "./assets/doc1.jpeg";
import doc2 from "./assets/doc2.jpeg";
import doc3 from "./assets/doc3.jpeg";

const CarouselWithIcons = () => {
  // Slick Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Carousel images
  const carouselItems = [vet1, vet2, vet3];

  // Icons and text
  const iconData = [
    { icon: <FaStethoscope />, text: 'Full Diagnose' },
    { icon: <FaAward />, text: 'Awarded Service' },
    { icon: <FaPhone />, text: '24/7 On-Call' },
    { icon: <FaUserMd />, text: 'The Best Experts' },
  ];

  // Team data
  const teamData = [
    {
      image: doc2,
      name: 'Dr. John Doe',
      specialty: 'Pet Dermatologist',
      experience: '9 years',
    },
    {
      image: doc1,
      name: 'Dr. Jane Smith',
      specialty: 'Veterinary Surgeon',
      experience: '12 years',
    },
    {
      image: doc3,
      name: 'Dr. Emily Brown',
      specialty: 'Animal Nutritionist',
      experience: '5 years',
    },
  ];

  // State to track hovered card
  const [hoveredCard, setHoveredCard] = useState(null);

  // State for filters
  const [petType, setPetType] = useState('');
  const [diseaseType, setDiseaseType] = useState('');

  // State for user location
  const [userLocation, setUserLocation] = useState(null);

  // State for nearby vets
  const [nearbyVets, setNearbyVets] = useState([]);

  // Mock data for nearby vets
  const mockVets = [
    {
      name: 'Dr. Alice Johnson',
      specialty: 'General Practitioner',
      distance: '1.2 km',
      image: doc1,
    },
    {
      name: 'Dr. Robert Brown',
      specialty: 'Emergency Care',
      distance: '2.5 km',
      image: doc2,
    },
    {
      name: 'Dr. Sarah Lee',
      specialty: 'Pet Dermatologist',
      distance: '3.0 km',
      image: doc3,
    },
  ];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  // Fetch nearby vets based on location (mock implementation)
  useEffect(() => {
    if (userLocation) {
      // Simulate fetching nearby vets
      setNearbyVets(mockVets);
    }
  }, [userLocation]);

  // Handle book appointment button click
  const handleBookAppointment = (vetName) => {
    alert(`Booking appointment with ${vetName}`);
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <div style={styles.container}>
        {/* Carousel Section */}
        <div style={styles.carouselContainer}>
          <Slider {...settings}>
            {carouselItems.map((image, index) => (
              <div key={index} style={styles.carouselSlide}>
                <img src={image} alt={`Slide ${index + 1}`} style={styles.carouselImage} />
              </div>
            ))}
          </Slider>
        </div>

        {/* Icons Section */}
        <div style={styles.iconsContainer}>
          {iconData.map((item, index) => (
            <div key={index} style={styles.iconItem}>
              <span style={styles.icon}>{item.icon}</span>
              <p style={styles.iconText}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Video and Text Card */}
        <div style={styles.cardContainer}>
          {/* Video Section */}
          <div style={styles.videoSection}>
            <video
              width="100%"
              height="100%"
              loop // Enable video loop
              autoPlay // Auto-play the video
              muted // Mute the video (required for auto-play in some browsers)
              style={styles.videoPlayer}
            >
              <source src={videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Text Section */}
          <div style={styles.textSection}>
            <h2 style={styles.textHeading}>How We Are Going to Serve You ??</h2>
            <p style={styles.textDescription}>
              We are committed to providing the best care for your pets. Our team of experts is available 24/7 to ensure your pets receive the attention they need. From full diagnostics to award-winning service, we are here to support you every step of the way.
            </p>
          </div>
        </div>

        {/* Our Team of Experts Heading */}
        <h2 style={styles.teamHeading}>Our Team of Experts</h2>

        {/* Team Cards Section */}
        <div style={styles.teamContainer}>
          {teamData.map((member, index) => (
            <div
              key={index}
              style={styles.teamCard}
              onMouseEnter={() => setHoveredCard(index)} // Set hovered card
              onMouseLeave={() => setHoveredCard(null)} // Reset hovered card
            >
              <img src={member.image} alt={member.name} style={styles.teamImage} />
              <div
                style={{
                  ...styles.teamOverlay,
                  opacity: hoveredCard === index ? '1' : '0', // Show overlay if hovered
                }}
              >
                <h3 style={styles.teamName}>{member.name}</h3>
                <p style={styles.teamSpecialty}>{member.specialty}</p>
                <p style={styles.teamExperience}>{member.experience} of experience</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Text Below Team Cards */}
        <p style={styles.additionalText}>
          Our expert team is passionate about your pet's health. With years of experience, we provide top-notch care, from check-ups to advanced treatments. Staying updated with the latest advancements, we ensure your pets thrive. Trust us to keep your furry friends healthy and happy. Your pet's well-being is our priority.
        </p>

        {/* Book Your Vet Home-Visit Now Heading */}
        <h2 style={styles.bookHeading}>Book Your Vet Home-Visit Now</h2>

        {/* Google Map and Filters Section */}
        <div style={styles.mapContainer}>
          {/* Filters */}
          <div style={styles.filtersContainer}>
            <select
              style={styles.filter}
              value={petType}
              onChange={(e) => setPetType(e.target.value)}
            >
              <option value="">Select Pet Type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
              <option value="birds">Birds</option>
              <option value="fish">Fish</option>
              <option value="other">Other</option>
            </select>

            <select
              style={styles.filter}
              value={diseaseType}
              onChange={(e) => setDiseaseType(e.target.value)}
            >
              <option value="">Select Disease Related To</option>
              <option value="derma">Derma</option>
              <option value="injury">Injury</option>
              <option value="internal">Internal Issue</option>
              <option value="behavioural">Behavioural Problems</option>
            </select>
          </div>

          {/* Google Map */}
          <div style={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.8699999999995!2d77.2079753150815!3d28.57298298244106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d0b%3A0x717971125923e5d!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1649342342000!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Nearby Vets Section */}
        <h2 style={styles.nearbyHeading}>Vets Near You</h2>
        <div style={styles.nearbyContainer}>
          {nearbyVets.map((vet, index) => (
            <div key={index} style={styles.nearbyCard}>
              <img src={vet.image} alt={vet.name} style={styles.nearbyImage} />
              <div style={styles.nearbyDetails}>
                <h3 style={styles.nearbyName}>{vet.name}</h3>
                <p style={styles.nearbySpecialty}>{vet.specialty}</p>
                <p style={styles.nearbyDistance}>{vet.distance} away</p>
                <button
                  style={styles.bookButton}
                  onClick={() => handleBookAppointment(vet.name)}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

// Inline CSS styles
const styles = {
  container: {
    fontFamily: 'Montaga',
    textAlign: 'center',
    maxWidth: '1350px', // Wider container
    margin: '0 auto',
    padding: '0px',
  },
  carouselContainer: {
    marginBottom: '20px',
  },
  carouselSlide: {
    textAlign: 'center',
  },
  carouselImage: {
    width: '100%', // Make the image cover full width
    height: '450px', // Fixed height for all images
    objectFit: 'cover', // Maintain aspect ratio and cover container
    borderRadius: '0px',
  },
  iconsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    gap: '50px',
  },
  iconItem: {
    textAlign: 'center',
  },
  icon: {
    fontSize: '50px',
    marginBottom: '10px',
    color: '#a277ff', // Purple color for icons
  },
  iconText: {
    margin: '0',
    fontSize: '18px',
    fontWeight: 600,
  },
  cardContainer: {
    display: 'flex',
    marginTop: '40px', // Space between icons and card
    borderRadius: '0px',
    overflow: 'hidden', // Ensure rounded corners for child elements
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
  },
  videoSection: {
    flex: 1, // Take up half the space
    backgroundColor: '#f0f0f0', // Light gray background for video section
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the video covers the container
  },
  textSection: {
    flex: 1, // Take up half the space
    backgroundColor: '#ff8c42', // Orange background
    padding: '40px',
    color: 'white', // White text for contrast
    textAlign: 'center', // Center text
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeading: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  textDescription: {
    fontSize: '20px',
    lineHeight: '1.6',
  },
  teamHeading: {
    fontSize: '45px',
    fontWeight: 'bold',
    marginTop: '60px',
    marginBottom: '40px',
    color: 'purple',
  },
  teamContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '50px', // Increased gap between cards
    marginBottom: '40px',
    width: '1340px',
  },
  teamCard: {
    position: 'relative',
    width: '27%', // Reduced width of cards
    height: '400px', // Increased height of cards
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  teamImage: {
    width: '100%',
    height: '100%', // Cover the entire card
    objectFit: 'cover', // Ensure the image covers the card
  },
  teamOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: '0',
    transition: 'opacity 0.3s ease',
  },
  teamName: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '-5px',
  },
  teamSpecialty: {
    fontSize: '20px',
    marginBottom: '2px',
  },
  teamExperience: {
    fontSize: '17px',
  },
  additionalText: {
    fontSize: '20.5px',
    lineHeight: '1.6',
    marginTop: '40px',
    marginBottom: '60px',
    padding: '0 20px',
    color: 'purple',
    width: '1000px',
    margin: '0 auto', // Center the text
  },
  bookHeading: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginTop: '60px',
    marginBottom: '40px',
    color: 'purple',
  },
  mapContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '60px',
  },
  filtersContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  filter: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  map: {
    width: '100%',
    height: '450px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  nearbyHeading: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginTop: '60px',
    marginBottom: '40px',
    color: 'purple',
  },
  nearbyContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '20px',
    marginBottom: '60px',
  },
  nearbyCard: {
    width: '30%',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  nearbyImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  nearbyDetails: {
    padding: '20px',
    textAlign: 'center',
  },
  nearbyName: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  nearbySpecialty: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  nearbyDistance: {
    fontSize: '16px',
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#a277ff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
};

export default CarouselWithIcons;