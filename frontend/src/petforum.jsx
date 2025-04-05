import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './assets/background.jpg';
import TopNavbar from './TNav';
import BottomNav from './BNav';
import Footer from './footer';
import PhotoCollage from './photo';
import fetchWithAuth from './fetchWithAuth';

const getBaseUrl = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8000'
    : 'https://furgo.onrender.com';
};

const PetForum = () => {
  const [newPost, setNewPost] = useState({
    title: '',
    posts_image: null,
    description: '',
  });
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      // Hit your "me" endpoint to get the logged-in user
      const response = await fetchWithAuth(
        `${getBaseUrl()}/auth/users/me/`,
        {},
        navigate
      );
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        // not authenticated → back to login/home
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      navigate('/');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewPost((p) => ({ ...p, posts_image: file }));
  };

  const handleTitleChange = (e) => {
    setNewPost((p) => ({ ...p, title: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setNewPost((p) => ({ ...p, description: e.target.value }));
  };

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.description) {
      alert('Please add a title and description.');
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('content', newPost.description);
    if (newPost.posts_image) {
      formData.append('posts_image', newPost.posts_image);
    }

    try {
      const response = await fetchWithAuth(
        `${getBaseUrl()}/posts/`,
        {
          method: 'POST',
          body: formData,
        },
        navigate
      );

      const text = await response.text();
      console.log('POST /posts/ →', response.status, text);

      if (response.ok) {
        alert('Post uploaded successfully!');
        navigate('/community');
      } else {
        alert('Upload failed: ' + text);
      }
    } catch (error) {
      console.error('Error uploading post:', error);
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <div style={styles.container}>
        <div
          style={{
            ...styles.backgroundImage,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />

        <div style={styles.header}>
          <h1 style={styles.title}>PetInsta</h1>
          <button
            onClick={() => navigate('/community')}
            style={styles.feedButton}
          >
            Community
          </button>
        </div>

        <div style={styles.createPostContainer}>
          <h2>Share Your Pet's Day</h2>
          <p>
            Posting as: <strong>{username || 'Loading...'}</strong>
          </p>

          <input
            type="text"
            placeholder="Enter title"
            value={newPost.title}
            onChange={handleTitleChange}
            style={styles.inputField}
          />

          <textarea
            placeholder="What did your pet do today? Any issues?"
            value={newPost.description}
            onChange={handleDescriptionChange}
            style={styles.textarea}
          />

          <label style={styles.fileInputLabel}>
            Choose an Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
          </label>

          <button
            onClick={handleAddPost}
            style={styles.postButton}
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>

        <PhotoCollage />
      </div>
      <Footer />
    </>
  );
};

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
    position: 'relative',
  },
  title: {
    fontSize: '60px',
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  feedButton: {
    backgroundColor: '#a277ff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    position: 'absolute',
    right: -330,
    top: 10,
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
  inputField: {
    width: '96%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
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
  fileInputLabel: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#a277ff',
    color: 'white',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  fileInput: {
    display: 'none',
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

export default PetForum;
