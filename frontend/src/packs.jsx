import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SubscriptionCards = () => {
  const cards = [
    {
      title: 'Platinum',
      price: '$1000',
      color: '#e5e4e2',
      features: ['20 Food Supplies', 'Weekly Update', 'Video Call every month'],
    },
    {
      title: 'Gold',
      price: '$750',
      color: '#ffd700',
      features: ['15 Food Supplies', 'Weekly Update', 'Video Call in 2 months'],
    },
    {
      title: 'Silver',
      price: '$500',
      color: '#c0c0c0',
      features: ['10 Food Supplies', 'Monthly Update', 'Video Call in 4 months'],
    },
    {
      title: 'Bronze',
      price: '$200',
      color: '#cd7f32',
      features: ['5 Food Supplies', 'Monthly Update', 'Video Call in 6 months'],
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  // Scroll event listener to detect when the component is in the viewport
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const top = ref.current.getBoundingClientRect().top;
        const bottom = ref.current.getBoundingClientRect().bottom;
        const isInViewport = top < window.innerHeight && bottom >= 0;
        if (isInViewport) {
          setIsVisible(true);
          window.removeEventListener('scroll', handleScroll); // Remove listener after triggering
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial render

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column', // Stack title and grid vertically
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '20px',
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontFamily: 'Montaga',
          fontSize: '3.5rem',
          color: 'purple',
          marginBottom: '40px',
          marginTop: '-300px',
          textAlign: 'center',
        }}
      >
        Choose Your Plan
      </h1>

      {/* Grid of Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)', // 4 columns for 4 cards
          gap: '20px',
          maxWidth: '1400px', // Increased maxWidth to fit all cards
          width: '100%',
          marginBottom: '-300px'
        }}
      >
        {/* Cards */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card {...cards[0]} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card {...cards[1]} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card {...cards[2]} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card {...cards[3]} />
        </motion.div>
      </div>
    </div>
  );
};

// Card Component
const Card = ({ title, price, color, features }) => {
  return (
    <div
      style={{
        fontFamily: 'Montaga',
        backgroundColor: color,
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        color: '#333',
        width: '250px', // Fixed width for all cards
        height: '350px', // Fixed height for all cards
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{title}</h2>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>{price}</h3>
        <h4 style={{ fontSize: '1.0rem', marginBottom: '10px' }}>Subscription</h4>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h5 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Features:</h5>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {features.map((feature, index) => (
            <li key={index} style={{ marginBottom: '5px' }}>
              ✔️ {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionCards;