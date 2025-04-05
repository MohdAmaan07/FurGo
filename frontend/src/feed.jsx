import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import fetchWithAuth from "./fetchWithAuth";
import TopNavbar from "./TNav";
import BottomNav from "./BNav";
import PhotoCollage from "./photo";
import Footer from "./footer";

const getBaseUrl = () => {
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://furgo.onrender.com";
};

// Styled components
const FeedContainer = styled.div`
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
`;

// New flex wrapper for search + button
const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

// Make search grow to fill available space
const SearchBar = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CreateButton = styled.button`
  padding: 10px 20px;
  background: #0077b6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #005f8a;
  }
`;

const PostContainer = styled.div`
  background: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
`;

const PostTitle = styled.h2`
  color: #333;
  margin: 0;
  font-size: 1.4rem;
`;

const PostMetadata = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 12px;
`;

const PostAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #0077b6;
  font-weight: 500;
`;

const PostDateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 0.9rem;
`;

const PostContent = styled.p`
  color: #333;
  font-size: 1.1rem;
  line-height: 1.5;
`;

const PostImage = styled.img`
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  margin-top: 10px;
`;

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetchWithAuth(`${getBaseUrl()}/posts/`, {}, navigate);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [navigate]);

  const filteredPosts = posts.filter(
    (post) =>
      post.author?.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleCreatePost = () => {
    navigate("/petforum"); // Navigate to your post creation page
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <FeedContainer>
        <ControlsContainer>
          <SearchBar
            type="text"
            placeholder="Search by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CreateButton onClick={handleCreatePost}>
            Create Post
          </CreateButton>
        </ControlsContainer>

        {filteredPosts.map((post) => (
          <PostContainer key={post.id}>
            <PostHeader>
              <PostTitle>{post.title || "Untitled Post"}</PostTitle>
            </PostHeader>
            
            <PostMetadata>
              <PostAuthorInfo>
                <FaUser size={14} />
                {post.author.username}
              </PostAuthorInfo>
              
              <PostDateInfo>
                <FaCalendarAlt size={14} />
                {formatDate(post.created_at)}
              </PostDateInfo>
            </PostMetadata>
            
            <PostContent>{post.content}</PostContent>
            
            {post.posts_image && (
              <PostImage
                src={post.posts_image.replace("http://127.0.0.1:8000", getBaseUrl())}
                alt={post.title || "Post image"}
              />
            )}
          </PostContainer>
        ))}

        <PhotoCollage />
      </FeedContainer>
      <Footer />
    </>
  );
};

export default Feed;