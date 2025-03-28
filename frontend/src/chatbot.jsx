import React, { useState } from "react";
import styled from "styled-components";
import { FaPaw, FaPaperPlane, FaTimes } from "react-icons/fa";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 100px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
  z-index: 1000;

  &:hover {
    background-color: #2E7D32;
  }
`;

const ChatContainer = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 90px;
  right: 20px;
  width: 350px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: ${({ open }) => (open ? "flex" : "none")};
  flex-direction: column;
`;

const ChatHeader = styled.div`
  background: #4CAF50;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  height: 300px;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  background: ${({ isUser }) => (isUser ? "#E3F2FD" : "#E8F5E9")};
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 5px;
  max-width: 80%;
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  background: #f9f9f9;
  border-top: 1px solid #eee;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
  outline: none;
`;

const SendButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #2E7D32;
  }
`;

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your PetPal Assistant. How can I help you?", isUser: false },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isUser: true }]);
    setInput("");
    try {
      const response = await fetch("https://furgo.onrender.com/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Error fetching response.", isUser: false }]);
    }
  };

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaPaw />}
      </FloatingButton>
      <ChatContainer open={isOpen}>
        <ChatHeader>
          <span>PetPal Assistant</span>
          <FaTimes style={{ cursor: "pointer" }} onClick={() => setIsOpen(false)} />
        </ChatHeader>
        <ChatMessages>
          {messages.map((msg, index) => (
            <Message key={index} isUser={msg.isUser}>{msg.text}</Message>
          ))}
        </ChatMessages>
        <ChatInputContainer>
          <ChatInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <SendButton onClick={sendMessage}>
            <FaPaperPlane />
          </SendButton>
        </ChatInputContainer>
      </ChatContainer>
    </>
  );
};

export default FloatingChatbot;
