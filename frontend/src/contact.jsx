import React, { useEffect, useRef } from 'react';
import Contacts from "./assets/Contacts.png";


const Contact = () => {
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  // Inline styles
  const styles = {
    contactContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      overflow: 'hidden',
      flexDirection: 'row', // Default layout for larger screens
      '@media (max-width: 768px)': {
        flexDirection: 'column', // Stack vertically on mobile
        padding: '20px',
      },
    },
    leftSide: {
      flex: 1,
      marginRight: '40px',
      transform: 'translateX(-100%)',
      transition: 'transform 1s ease-out',
      '@media (max-width: 768px)': {
        marginRight: '0',
        marginBottom: '20px',
        width: '100%',
      },
    },
    contactImage: {
      width: '650px',
      height: 'auto',
      borderRadius: '10px',
      '@media (max-width: 768px)': {
        width: '100%',
      },
    },
    contactText: {
      marginTop: '20px',
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#333',
    },
    rightSide: {
      flex: 1,
      transform: 'translateX(100%)',
      transition: 'transform 1s ease-out',
      '@media (max-width: 768px)': {
        width: '100%',
      },
    },
    contactCard: {
      background: '#ff914d',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '@media (max-width: 768px)': {
        padding: '20px',
      },
    },
    cardHeading: {
      marginBottom: '20px',
      fontSize: '35px',
      color: 'black',
      fontFamily: 'Montaga',
      '@media (max-width: 768px)': {
        fontSize: '28px',
      },
    },
    cardText: {
      marginBottom: '20px',
      fontSize: '16px',
      color: '#555',
    },
    formGroup: {
      marginBottom: '20px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    formLabel: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#333',
    },
    formInput: {
      width: '450px',
      padding: '10px',
      border: '2px solid rgb(128, 228, 226)',
      borderRadius: '5px',
      fontSize: '14px',
      '@media (max-width: 768px)': {
        width: '100%',
      },
    },
    formTextarea: {
      width: '450px',
      padding: '10px',
      border: '2px solid rgb(128, 228, 226)',
      borderRadius: '5px',
      fontSize: '14px',
      resize: 'vertical',
      '@media (max-width: 768px)': {
        width: '100%',
      },
    },
    submitButton: {
      background: 'rgb(8, 136, 134)',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '300px',
      '@media (max-width: 768px)': {
        width: '100%',
      },
    },
    submitButtonHover: {
      background: '#0056b3',
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const leftSide = leftSideRef.current;
      const rightSide = rightSideRef.current;
      const scrollPosition = window.scrollY + window.innerHeight;

      if (leftSide && scrollPosition > leftSide.offsetTop) {
        leftSide.style.transform = 'translateX(0)';
      }
      if (rightSide && scrollPosition > rightSide.offsetTop) {
        rightSide.style.transform = 'translateX(0)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={styles.contactContainer}>
      {/* Left Side: Image and Text */}
      <div style={styles.leftSide} ref={leftSideRef}>
        <img
          src={Contacts} // Replace with your image URL
          alt="Contact"
          style={styles.contactImage}
        />
      </div>

      {/* Right Side: Contact Card */}
      <div style={styles.rightSide} ref={rightSideRef}>
        <div style={styles.contactCard}>
          <h2 style={styles.cardHeading}>Contact Me</h2>
          <form>
            <div style={styles.formGroup}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                style={styles.formInput}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                style={styles.formInput}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                rows="5"
                style={styles.formTextarea}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              style={styles.submitButton}
              onMouseOver={(e) => (e.target.style.background = styles.submitButtonHover.background)}
              onMouseOut={(e) => (e.target.style.background = styles.submitButton.background)}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;