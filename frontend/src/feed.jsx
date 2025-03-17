import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // For icons
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons'; // Icons for search and post
import backgroundImage from './assets/background.jpg'; // Replace with your background image path
import TopNavbar from './TNav';
import BottomNav from './BNav';
import PhotoCollage from './photo';
import Footer from './footer';

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState({}); // State to manage comments
  const [likes, setLikes] = useState({}); // State to manage likes
  const [commentInputs, setCommentInputs] = useState({}); // State for comment inputs
  const [activeCommentSection, setActiveCommentSection] = useState(null); // State to toggle comment section
  const navigate = useNavigate(); // Hook for navigation

  const posts = JSON.parse(localStorage.getItem('posts')) || []; // Fetch posts from localStorage

  // Filter posts by username
  const filteredPosts = posts.filter((post) =>
    post.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle like a post
  const handleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: (prevLikes[postId] || 0) + 1,
    }));
  };

  // Handle adding a comment
  const handleAddComment = (postId) => {
    const comment = commentInputs[postId];
    if (comment) {
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), comment],
      }));
      setCommentInputs((prevInputs) => ({ ...prevInputs, [postId]: '' })); // Clear input
    }
  };

  // Handle sharing a post
  const handleShare = (postId) => {
    const postLink = `${window.location.origin}/post/${postId}`; // Example link
    navigator.clipboard.writeText(postLink).then(() => {
      alert('Post link copied to clipboard!');
    });
  };

  // Toggle comment section
  const toggleCommentSection = (postId) => {
    setActiveCommentSection(activeCommentSection === postId ? null : postId);
  };

  // Navigate to the social media post page
  const goToPostPage = () => {
    navigate('/Feed'); // Replace with your post page route
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <div style={styles.container}>
        {/* Background Image */}
        <div style={{ ...styles.backgroundImage, backgroundImage: `url(${backgroundImage})` }}></div>

        {/* Header with Search Bar and Post Button */}
        <div style={styles.header}>
          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Post Button */}
          <button onClick={goToPostPage} style={styles.postButton}>
            <FontAwesomeIcon icon={faPlus} style={styles.postIcon} />
            Post
          </button>
        </div>

        {/* Posts Feed */}
        <div style={styles.feedContainer}>
          {filteredPosts.map((post) => (
            <div key={post.id} style={styles.postContainer}>
              {/* User Details */}
              <div style={styles.userDetails}>
                <img
                  src={post.displayPicture}
                  alt="User"
                  style={styles.displayPicture}
                />
                <span style={styles.username}>{post.username}</span>
              </div>

              {/* Post Image */}
              <div style={styles.postImageContainer}>
                <img src={post.photo} alt="Pet" style={styles.postImage} />
              </div>

              {/* Post Description */}
              <p style={styles.postDescription}>{post.description}</p>

              {/* Interaction Buttons (Like, Share, Comment) */}
              <div style={styles.interactionContainer}>
                <button
                  onClick={() => handleLike(post.id)}
                  style={styles.likeButton}
                >
                  ❤️ {likes[post.id] || 0} Likes
                </button>
                <button
                  onClick={() => handleShare(post.id)}
                  style={styles.shareButton}
                >
                  🔗 Share
                </button>
                <button
                  onClick={() => toggleCommentSection(post.id)}
                  style={styles.commentButton}
                >
                  💬 Comment
                </button>
              </div>

              {/* Comment Section */}
              {activeCommentSection === post.id && (
                <div style={styles.commentsSection}>
                  <h2>Comments:</h2>
                  {(comments[post.id] || []).map((comment, index) => (
                    <p key={index} style={styles.comment}>
                      {comment}
                    </p>
                  ))}
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs((prevInputs) => ({
                        ...prevInputs,
                        [post.id]: e.target.value,
                      }))
                    }
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id);
                    }}
                    style={styles.commentInput}
                  />
                </div>
              )}
            </div>
          ))}
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
    position: 'relative', // For absolute positioning of the Post button
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '20px',
    padding: '10px 15px', // Increased padding for thickness
    width: '100%',
    border: '2px solid #ccc', // Default border
    transition: 'border-color 0.3s ease', // Smooth transition for border color
    right: 200
  },
  searchIcon: {
    color: 'purple',
    marginRight: '10px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '16px',
    width: '100%',
  },
  postButton: {
    backgroundColor: '#a277ff',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '19px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    position: 'absolute', // Position the button absolutely
    right: -330, // Align to the right
    height: '40px'
  },
  postIcon: {
    fontSize: '22px',
  },
  feedContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
  },
  postContainer: {
    border: '3px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    backgroundColor: 'rgba(214, 156, 248, 0.8)',
    width: '100%',
    maxWidth: '500px',
    marginBottom: '70px',
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  displayPicture: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  username: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  postImageContainer: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  postImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  postDescription: {
    fontSize: '26px',
    margin: '10px 0',
  },
  interactionContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  likeButton: {
    backgroundColor: '#ff6b6b',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  shareButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  commentButton: {
    backgroundColor: '#6b6bff',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  commentsSection: {
    marginTop: '10px',
  },
  comment: {
    backgroundColor: '#e0e0e0',
    padding: '5px 10px',
    borderRadius: '5px',
    margin: '5px 0',
    fontSize: '17px',
  },
  commentInput: {
    width: '100%',
    padding: '5px',
    borderRadius: '5px',
    border: '2px solid #ccc',
  },
};

export default Feed;