import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { 
  FaCalendarAlt, 
  FaUser, 
  FaThumbsUp, 
  FaThumbsDown, 
  FaComment 
} from "react-icons/fa";
import fetchWithAuth from "./fetchWithAuth";
import TopNavbar from "./TNav";
import BottomNav from "./BNav";
import PhotoCollage from "./photo";
import Footer from "./footer";

const getBaseUrl = () => {
  return window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://furgo.onrender.com";
};

// Styled components
const FeedContainer = styled.div`
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

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

const ReactionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
`;

const ReactionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  color: ${({ active }) => (active ? "#0077b6" : "#666")};
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: #005f8a;
  }
`;

const CommentsToggle = styled.button`
  margin-left: auto;
  background: none;
  border: none;
  color: #0077b6;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const CommentsContainer = styled.div`
  margin-top: 15px;
`;

const Comment = styled.div`
  border-top: 1px solid #eee;
  padding: 8px 0;
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  margin-right: 5px;
`;

const CommentContent = styled.span`
  color: #333;
`;

const CommentDate = styled.div`
  color: #999;
  font-size: 0.8rem;
  margin-top: 4px;
`;

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CommentButton = styled.button`
  padding: 8px 12px;
  background: #0077b6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #005f8a;
  }
`;

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [reactions, setReactions] = useState({});
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetchWithAuth(
          `${getBaseUrl()}/posts/`,
          {},
          navigate
        );
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, [navigate]);

  // Once posts are loaded, fetch reactions for each
  useEffect(() => {
    if (!posts.length) return;

    const fetchAllReactions = async () => {
      try {
        const entries = await Promise.all(
          posts.map(async (post) => {
            const res = await fetchWithAuth(
              `${getBaseUrl()}/posts/${post.id}/reactions/`,
              {},
              navigate
            );
            if (!res.ok) throw new Error("Failed to fetch reactions");
            const data = await res.json();
            return [post.id, {
              likes: data.likes,
              dislikes: data.dislikes,
              userReaction: data.user_reaction,
            }];
          })
        );
        setReactions(Object.fromEntries(entries));
      } catch (err) {
        console.error("Error loading reactions:", err);
      }
    };

    fetchAllReactions();
  }, [posts, navigate]);

  const filteredPosts = posts.filter((post) =>
    post.author?.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const opts = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", opts);
  };

  const handleCreatePost = () => {
    navigate("/petforum");
  };

  // Like / Dislike handlers
  const sendReaction = async (postId, reactionType) => {
    try {
      const res = await fetchWithAuth(
        `${getBaseUrl()}/posts/${postId}/reactions/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reaction: reactionType }),
        },
        navigate
      );
      if (!res.ok) throw new Error("Failed to send reaction");
      const data = await res.json();
      setReactions((prev) => ({
        ...prev,
        [postId]: {
          likes: data.likes,
          dislikes: data.dislikes,
          userReaction: data.user_reaction,
        },
      }));
    } catch (err) {
      console.error(`Error sending ${reactionType} for post ${postId}:`, err);
    }
  };

  const handleLike = (postId) => sendReaction(postId, "like");
  const handleDislike = (postId) => sendReaction(postId, "dislike");

  // Comments handlers
  const toggleComments = async (postId) => {
    const currentlyShown = !!showComments[postId];
    if (!currentlyShown) {
      // fetch comments
      try {
        const res = await fetchWithAuth(
          `${getBaseUrl()}/posts/${postId}/comments/`,
          {},
          navigate
        );
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments((prev) => ({ ...prev, [postId]: data }));
      } catch (err) {
        console.error(`Error loading comments for post ${postId}:`, err);
        setComments((prev) => ({ ...prev, [postId]: [] }));
      }
    }
    setShowComments((prev) => ({ ...prev, [postId]: !currentlyShown }));
  };

  const handleAddComment = async (e, postId) => {
    e.preventDefault();
    const content = newComment[postId];
    if (!content) return;
    try {
      const res = await fetchWithAuth(
        `${getBaseUrl()}/posts/${postId}/comments/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        },
        navigate
      );
      if (!res.ok) throw new Error("Failed to post comment");
      const data = await res.json();
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), data],
      }));
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error(`Error posting comment for post ${postId}:`, err);
    }
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
                src={post.posts_image.replace(
                  "http://127.0.0.1:8000",
                  getBaseUrl()
                )}
                alt={post.title || "Post image"}
              />
            )}

            <ReactionContainer>
              <ReactionButton
                active={reactions[post.id]?.userReaction === "like"}
                onClick={() => handleLike(post.id)}
              >
                <FaThumbsUp /> {reactions[post.id]?.likes || 0}
              </ReactionButton>

              <ReactionButton
                active={reactions[post.id]?.userReaction === "dislike"}
                onClick={() => handleDislike(post.id)}
              >
                <FaThumbsDown /> {reactions[post.id]?.dislikes || 0}
              </ReactionButton>

              <CommentsToggle onClick={() => toggleComments(post.id)}>
                <FaComment />
                {showComments[post.id] ? "Hide Comments" : "Show Comments"}
              </CommentsToggle>
            </ReactionContainer>

            {showComments[post.id] && (
              <CommentsContainer>
                {(comments[post.id] || []).map((c) => (
                  <Comment key={c.id}>
                    <CommentAuthor>{c.author.username}</CommentAuthor>
                    <CommentContent>{c.content}</CommentContent>
                    <CommentDate>
                      {formatDate(c.created_at)}
                    </CommentDate>
                  </Comment>
                ))}

                <CommentForm onSubmit={(e) => handleAddComment(e, post.id)}>
                  <CommentInput
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment[post.id] || ""}
                    onChange={(e) =>
                      setNewComment((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                  />
                  <CommentButton type="submit">Post</CommentButton>
                </CommentForm>
              </CommentsContainer>
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
