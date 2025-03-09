import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import gira from './assets/giraf.png'; // Ensure the path to your image is correct

const RulersOfWildCarousel = ({ cardWidth = 400, cardHeight = 430, gap = 10 }) => {
  // Sample data for the cards
  const cards = [
    {
      id: 1,
      title: 'Lion',
      image: 'https://via.placeholder.com/300x200',
      description: 'The king of the jungle.',
    },
    {
      id: 2,
      title: 'Tiger',
      image: 'https://via.placeholder.com/300x200',
      description: 'A majestic big cat.',
    },
    {
      id: 3,
      title: 'Elephant',
      image: 'https://via.placeholder.com/300x200',
      description: 'Gentle giant of the wild.',
    },
    {
      id: 4,
      title: 'Giraffe',
      image: 'https://via.placeholder.com/300x200',
      description: 'Tall and graceful.',
    },
  ];

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false, // Remove arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false, // Remove arrows for responsive breakpoints
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Remove arrows for responsive breakpoints
        },
      },
    ],
  };

  // Inline styles
  const styles = {
    container: {
      fontFamily:'Montaga',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start', // Left-align the carousel
      padding: '20px',
      backgroundColor: ' #fc9657',
      position: 'relative', // For positioning the right image
    },
    carouselWrapper: {
      width: '70%', // Adjust width to leave space for the right image
    },
    title: {
      fontSize: '3rem',
      color: 'black',
      marginBottom: '10px',
      marginLeft: '580px'
    },
    subheading: {
      fontSize: '1.7rem',
      color: 'white',
      marginBottom: '30px',
      marginLeft: '640px'
      // Center the subheading
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      backgroundColor: '#fff',
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      margin: `0 ${gap / 2}px`, // Decreased gap between cards
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    cardContent: {
      padding: '20px',
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: '1.5rem',
      color: '#333',
      marginBottom: '10px',
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#666',
      marginBottom: '20px',
    },
    adoptButton: {
      backgroundColor: 'orange',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
    },
    adoptButtonHover: {
      backgroundColor: 'darkorange',
    },
    rightImage: {
      position: 'absolute',
      right: '0px', // Position the image on the right
      top: '350px',
      transform: 'translateY(-50%)',
      width: '600px', // Adjust the width of the image
      height: 'auto',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.carouselWrapper}>
        <h1 style={styles.title}>Rulers Of Wild</h1>
        <h3 style={styles.subheading}>Up for Adoption</h3>
        <Slider {...settings}>
          {cards.map((card) => (
            <div key={card.id}>
              <div
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = styles.cardHover.transform;
                  e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  style={styles.cardImage}
                />
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{card.title}</h3>
                  <p style={styles.cardDescription}>{card.description}</p>
                  <button
                    style={styles.adoptButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = styles.adoptButtonHover.backgroundColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = styles.adoptButton.backgroundColor;
                    }}
                  >
                    Adopt Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Right Image */}
      <img
        src={gira} // Replace with your image URL
        alt="Right Side Image"
        style={styles.rightImage}
      />
    </div>
  );
};

export default RulersOfWildCarousel;