import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import elephant from "./assets/ele.png";
import lioness from "./assets/lioness.png";
import wolf from "./assets/wolf.png";
import panda from "./assets/pan.png";
import ostrich from "./assets/ostrich.png";
import girrafe from "./assets/girraf.png";
import RulersOfWildCarousel from './wild';
import TopNavbar from './TNav';
import Footer from './footer';
import SubscriptionCards from './packs';
import BottomNav from './BNav';

const CarouselComponent = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const largeSliderRef = useRef(null); // Ref for the large carousel

  // Sample images with titles, text, and locations
  const images = [
    {
      src: elephant,
      title: "Elephant",
      text: "The majestic elephant roaming freely in the wild.",
      location: "Serengeti National Park, Tanzania",
    },
    {
      src: lioness,
      title: "Lioness",
      text: "A fierce lioness on the prowl in the savannah.",
      location: "Maasai Mara, Kenya",
    },
    {
      src: wolf,
      title: "Wolf",
      text: "A lone wolf howling under the moonlight.",
      location: "Yellowstone National Park, USA",
    },
    {
      src: panda,
      title: "Panda",
      text: "A cute panda munching on bamboo leaves.",
      location: "Chengdu, China",
    },
    {
      src: ostrich,
      title: "Ostrich",
      text: "The fastest bird on land, sprinting across the desert.",
      location: "Kalahari Desert, Botswana",
    },
    {
      src: girrafe,
      title: "Giraffe",
      text: "A tall giraffe gracefully eating from the treetops.",
      location: "Kruger National Park, South Africa",
    },
  ];

  // Settings for the large carousel
  const settingsLarge = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current) => setSelectedImage(current),
  };

  // Settings for the small carousel
  const settingsSmall = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6, // Show all six smaller cards
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false, // Hide arrows in the small carousel
    afterChange: (current) => setSelectedImage(current),
  };

  // Handle click on small card
  const handleSmallCardClick = (index) => {
    setSelectedImage(index); // Update the selected image state
    largeSliderRef.current.slickGoTo(index); // Programmatically move the large carousel to the selected slide
  };

  return (
    <>
      <TopNavbar />
      <div style={styles.container}>
        {/* Large Carousel */}
        <div style={styles.largeCarousel}>
          <Slider {...settingsLarge} initialSlide={selectedImage} ref={largeSliderRef}>
            {images.map((img, index) => (
              <div key={index} style={styles.largeSlide}>
                <img src={img.src} alt={`Slide ${index}`} style={styles.largeImage} />
                {/* Overlay for title, text, and location */}
                <div style={styles.overlay}>
                  <h2 style={styles.title}>{img.title}</h2>
                  <p style={styles.text}>{img.text}</p>
                  <p style={styles.location}>{img.location}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Small Carousel */}
        <div style={styles.smallCarousel}>
          <Slider {...settingsSmall} initialSlide={selectedImage}>
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => handleSmallCardClick(index)}
                style={{
                  ...styles.smallImageContainer,
                  transform: index === selectedImage ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                <img
                  src={img.src}
                  alt={`Thumbnail ${index}`}
                  style={{
                    ...styles.smallImage,
                    border: index === selectedImage ? '3px solid black' : '2px solid transparent',
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <RulersOfWildCarousel />
      <SubscriptionCards />
      <Footer />
      <BottomNav />
    </>
  );
};

// Inline styles
const styles = {
  container: {
    position: 'relative',
    width: '99vw', // Full viewport width
    height: '100vh', // Full viewport height
    overflow: 'hidden', // Hide any overflow
  },
  largeCarousel: {
    width: '100%',
    height: '100%', // Full height
    position: 'relative', // Ensure the carousel is positioned relative
  },
  largeSlide: {
    position: 'relative',
    width: '100%',
    height: '100%', // Full height
  },
  largeImage: {
    width: '1348.5px',
    height: '670px', // Full height
    objectFit: 'cover', // Ensure the image covers the entire area
  },
  overlay: {
    position: 'absolute',
    top: '20px', // Position at the top
    right: '20px', // Position at the right
    color: 'white',
    textAlign: 'left',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker background for better contrast
    padding: '20px',
    borderRadius: '10px',
    zIndex: 2, // Ensure the overlay is above the image
    maxWidth: '300px', // Limit the width of the overlay
  },
  title: {
    fontSize: '24px',
    margin: '0 0 10px 0',
    fontWeight: 'bold', // Make the title stand out
  },
  text: {
    fontSize: '16px',
    margin: '0 0 10px 0',
    lineHeight: '1.5', // Improve readability
  },
  location: {
    fontSize: '14px',
    margin: '0',
    fontStyle: 'italic',
  },
  smallCarousel: {
    position: 'absolute',
    bottom: '-2px', // Position at the bottom
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60%',
    zIndex: 2,
  },
  smallImageContainer: {
    padding: '10px',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  smallImage: {
    width: '100px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '8px',
    transition: 'border 0.3s ease',
  },
};

export default CarouselComponent;