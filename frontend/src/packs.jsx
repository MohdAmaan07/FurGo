import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import backgroundImage from './assets/backss.png';

const SubscriptionCards = () => {
  const cards = [
    { title: 'Bronze', price: '$200', color: '#CD7F32', features: ['5 Food Supplies', 'Monthly Update', 'Video Call in 6 months'] },
    { title: 'Silver', price: '$500', color: '#C0C0C0', features: ['10 Food Supplies', 'Monthly Update', 'Video Call in 4 months'] },
    { title: 'Gold', price: '$750', color: '#FFD700', features: ['15 Food Supplies', 'Weekly Update', 'Video Call in 2 months'] },
    { title: 'Platinum', price: '$1000', color: '#E5E4E2', features: ['20 Food Supplies', 'Weekly Update', 'Video Call every month'] },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const top = ref.current.getBoundingClientRect().top;
        if (top < window.innerHeight) {
          setIsVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} style={styles.container}>
      <h1 style={styles.heading}>Choose Your Plan</h1>

      {/* Grid of Cards */}
      <div style={styles.grid}>
        {cards.map((card, index) => (
          <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.2 }}>
            <Card {...card} />
            {index === 2 && <h2 style={styles.mostPurchased}>Most Purchased</h2>}
          </motion.div>
        ))}
      </div>

      {/* Full-width Image */}
      <div style={styles.fullWidthImage}>
        <img src={backgroundImage} alt="Full-width" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
    </div>
  );
};

// Card Component with Shine Effect
const Card = ({ title, price, color, features }) => {
  return (
    <div style={{ ...styles.card, backgroundColor: color }}>
      <div style={styles.shine}></div>
      <h2 style={styles.cardTitle}>{title}</h2>
      <h3 style={styles.cardPrice}>{price}</h3>
      <h4 style={styles.cardSubtitle}>Subscription</h4>
      <h5 style={styles.cardFeatureTitle}>Features:</h5>
      <ul style={styles.cardList}>
        {features.map((feature, index) => (
          <li key={index} style={styles.cardListItem}>✔️ {feature}</li>
        ))}
      </ul>
    </div>
  );
};

// **Styles (CSS-in-JS)**
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    fontFamily: 'Montaga'
  },
  heading: {
    fontFamily: 'Montaga',
    fontSize: '3.5rem',
    color: 'purple',
    marginBottom: '20px',
    marginTop: '30px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    maxWidth: '1400px',
    width: '100%',
    marginBottom: '-10px',
    marginTop: '50px'
  },
  mostPurchased: {
    fontFamily: 'Montaga',
    fontSize: '1.5rem',
    color: 'black',
    textAlign: 'center',
    margin: 0,
    marginTop: '-420px'
  },
  fullWidthImage: {
    width: '99vw',
    marginTop: '50px',
    marginBottom: '-20px',
  },
  card: {
    fontFamily: 'Montaga, sans-serif',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    color: '#333',
    width: '250px',
    height: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  },
  shine: {
    position: 'absolute',
    top: '0',
    left: '-100%',
    width: '200%',
    height: '100%',
    background: 'linear-gradient(to right, transparent 10%, rgba(255, 255, 255, 0.6) 50%, transparent 90%)',
    transform: 'skewX(-25deg)',
    animation: 'shine-animation 3s infinite linear',
  },
  '@keyframes shine-animation': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
  cardTitle: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    color: 'black',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
    zIndex: 1
  },
  cardPrice: {
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: 'black',
    marginTop: '-10px',
    zIndex: 1

  },
  cardSubtitle: {
    fontSize: '1rem',
    marginBottom: '1px',
    color: 'black',
    marginTop: '-20px',
    zIndex: 1

  },
  cardFeatureTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: 'black',
    marginTop: '-10px',
    zIndex: 1
  },
  cardList: {
    listStyle: 'none',
    padding: 0,
    marginTop: '-20px',
    zIndex: 1

  },
  cardListItem: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: 'black',
    zIndex: 1
  },
};

export default SubscriptionCards;
