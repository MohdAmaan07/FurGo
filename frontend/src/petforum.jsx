import React, { useState } from 'react';

// Import images from assets
import backgroundImage from './assets/background.jpg'; // Replace with your background image path
import Footer from './footer';
import TopNavbar from './TNav';
import BottomNav from './BNav';

const PetSocialFeed = () => {
  // State to manage posts
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ photo: null, description: '' });

  // State to manage comments and likes
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [commentInputs, setCommentInputs] = useState({}); // State for comment inputs
  const [activeCommentSection, setActiveCommentSection] = useState(null); // State to toggle comment section

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

  // Add a new post
  const handleAddPost = () => {
    if (newPost.photo && newPost.description) {
      const post = {
        id: Date.now(),
        photo: newPost.photo,
        description: newPost.description,
      };
      setPosts([post, ...posts]);
      setNewPost({ photo: null, description: '' }); // Reset form
    }
  };

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

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <div style={styles.container}>
        {/* Background Image */}
        <div style={{ ...styles.backgroundImage, backgroundImage: `url(${backgroundImage})` }}></div>

        {/* Title */}
        <h1 style={styles.title}>PetInsta</h1>

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

        {/* Posts Feed */}
        <div style={styles.feedContainer}>
          {posts.map((post) => (
            <div key={post.id} style={styles.postContainer}>
              <div style={styles.postImageContainer}>
                <img src={post.photo} alt="Pet" style={styles.postImage} />
              </div>
              <p style={styles.postDescription}>{post.description}</p>
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
    opacity: 0.5, // Adjust opacity as needed
  },
  title: {
    textAlign: 'center',
    fontSize: '60px',
    color: 'black',
    marginBottom: '20px',
  },
  createPostContainer: {
    marginBottom: '100px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
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
  feedContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center', // Center the posts
  },
  postContainer: {
    border: '3px solid #ccc',
    borderRadius: '10px',
    padding: '15px',
    backgroundColor: 'rgba(214, 156, 248, 0.8)', // Semi-transparent background
    width: '100%', // Adjusted to take full width of the container
    maxWidth: '500px', // Limit the maximum width of the post card
  },
  postImageContainer: {
    width: '100%',
    height: '300px', // Fixed height for image container
    overflow: 'hidden', // Ensure the image fits within the container
    borderRadius: '10px',
  },
  postImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the image covers the container
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
    fontSize: '18px',
  },
  shareButton: {
    backgroundColor: 'green',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '17px',
  },
  commentButton: {
    backgroundColor: '#6b6bff',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '17px',
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

export default PetSocialFeed;