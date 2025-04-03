import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import fetchWithAuth from "./fetchWithAuth";
import TopNavbar from "./TNav";
import BottomNav from "./BNav";
import PhotoCollage from "./photo";
import Footer from "./footer";

const getBaseUrl = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8000'
    : 'https://furgo.onrender.com';
};

// Styled components
const FeedContainer = styled.div`
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const SearchBar = styled.input`
  width: 100%;
  maxWidth: 400px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PostContainer = styled.div`
  background: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

const PostAuthor = styled.h3`
  color: #0077b6;
  margin-bottom: 5px;
`;

const PostContent = styled.p`
  color: #333;
`;

const PostImage = styled.img`
  width: 100%;
  maxWidth: 500px;
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
        // Use getBaseUrl() instead of API_BASE
        const response = await fetchWithAuth(`${getBaseUrl()}/posts/`, {}, navigate);

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
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
      post.author &&
      post.author.username &&
      post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <FeedContainer>
        <SearchBar
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {filteredPosts.map((post) => (
          <PostContainer key={post.id}>
            <PostAuthor>{post.author.username}</PostAuthor>
            <PostContent>{post.content}</PostContent>
            {post.posts_image && (
              <PostImage 
                src={post.posts_image.replace('http://127.0.0.1:8000', getBaseUrl())} 
                alt="Post" 
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