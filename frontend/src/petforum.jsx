import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import backgroundImage from './assets/background.jpg'; // Replace with your background image path
import TopNavbar from './TNav';
import BottomNav from './BNav';
import Footer from './footer';
import PhotoCollage from './photo';

const PetSocialFeed = () => {
  const [newPost, setNewPost] = useState({ photo: null, description: '' });
  const navigate = useNavigate(); // Hook for navigation

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, photo: URL.createObjectURL(file) });
    }
  };

  // Handle text input change
  const handleDescriptionChange = (e) => {
    setNewPost({ ...newPost, description: e.target.value });
  };

  // Add a new post and navigate to Feed
  const handleAddPost = () => {
    if (newPost.photo && newPost.description) {
      const post = {
        id: Date.now(),
        photo: newPost.photo,
        description: newPost.description,
        username: 'YourUsername', // Replace with dynamic username if available
        displayPicture: 'https://via.placeholder.com/50', // Replace with dynamic DP if available
      };

      // Save the post to localStorage (or a global state/context)
      const existingPosts = JSON.parse(localStorage.getItem('posts')) || [];
      const updatedPosts = [post, ...existingPosts];
      localStorage.setItem('posts', JSON.stringify(updatedPosts));

      // Navigate to Feed
      navigate('/community');
    }
  };

  // Navigate to Feed
  const goToFeed = () => {
    navigate('/community');
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <div style={styles.container}>
        {/* Background Image */}
        <div style={{ ...styles.backgroundImage, backgroundImage: `url(${backgroundImage})` }}></div>

        {/* Header with Centered Title and Right-Aligned Feed Button */}
        <div style={styles.header}>
          <h1 style={styles.title}>PetInsta</h1>
          <button onClick={goToFeed} style={styles.feedButton}>
            Feed
          </button>
        </div>

        {/* Create a Post Section */}
        <div style={styles.createPostContainer}>
          <h2>Share Your Pet's Day</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.fileInput}
          />
          <textarea
            placeholder="What did your pet do today? Any issues?"
            value={newPost.description}
            onChange={handleDescriptionChange}
            style={styles.textarea}
          />
          <button onClick={handleAddPost} style={styles.postButton}>
            Post
          </button>
        </div>
        <PhotoCollage />
      </div>
      <Footer />
    </>
  );
};

// Inline CSS styles
const styles = {
  container: {
    fontFamily: 'Montaga',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    position: 'relative',
  },
  backgroundImage: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1,
    opacity: 0.5,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative', // To allow absolute positioning of the Feed button
  },
  title: {
    fontSize: '60px',
    color: 'black',
    textAlign: 'center', // Center the title text
    flex: 1, // Allow the title to take up remaining space
  },
  feedButton: {
    backgroundColor: '#a277ff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    position: 'absolute', // Position the button absolutely
    right: -330,
    top: 10 // Align the button to the right
  },
  createPostContainer: {
    marginBottom: '100px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    color: 'purple',
    fontSize: '25px',
  },
  fileInput: {
    marginBottom: '10px',
  },
  textarea: {
    width: '96%',
    height: '140px',
    marginBottom: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  postButton: {
    fontFamily: 'Montaga',
    backgroundColor: '#a277ff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
  },
};

export default PetSocialFeed;