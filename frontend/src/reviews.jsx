import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cus1 from "./assets/Cus1.jpeg";
import Cus2 from "./assets/Cus2.jpeg"; 
import Cus3 from "./assets/Cus3.jpeg"; 
import Cus4 from "./assets/Cus4.jpeg"; 
import Cus5 from "./assets/Cus5.jpeg"; 
import Cus6 from "./assets/Cus6.jpeg"; 
import Cus7 from "./assets/Cus7.jpeg"; 
import Cus8 from "./assets/Cus8.jpeg"; 
import Cus9 from "./assets/Cus9.jpeg"; 
import Cus10 from "./assets/Cus10.jpeg"; 

// Sample reviews data
const reviews = [
  {
    id: 1,
    image: Cus1,
    name: "John & Ariza",
    review:
      "The AI chatbot feature is so cool! It analyzed my cat's behavior and suggested dietary changes that actually made a difference. The website is well-designed, and it’s obvious that a lot of thought went into making it useful for pet owners. Great job!",
    rating: 5,
  },
  {
    id: 2,
    image: Cus2,
    name: "Sarah Smith",
    review:
      "I’ve tried multiple pet service platforms, but this one stands out! The user-friendly interface made it so easy to order pet food and book vet appointments. My dog absolutely loved the high-quality treats. The AI recommendation system is a game-changer!",
    rating: 4,
  },
  {
    id: 3,
    image: Cus3,
    name: "Lee Haleiy",
    review:
      "Finding a reliable vet has never been easier! I booked a consultation through the website, and within minutes, I had an appointment scheduled. The vet was professional and knowledgeable. I appreciate the effort in creating a platform that truly prioritizes pet health.",
    rating: 5,
  },
  {
    id: 4,
    image: Cus4,
    name: "Eli Rose",
    review:
      "I love how this site connects pet lovers to everything they need in one place! I ordered pet toys, food, and even got recommendations on training techniques. The delivery was quick, and the quality of the products was top-notch. Will definitely be using this service regularly!",
    rating: 5,
  },
  {
    id: 5,
    image: Cus5,
    name: "Emma Watson",
    review:
      "I adopted a kitten through this site, and the entire process was seamless. The adoption section is well-organized, and I felt reassured knowing the animals are well cared for. The virtual adoption feature is a great initiative too! It’s wonderful to support a platform that genuinely cares for pets and their well-being.",
    rating: 4,
  },
  {
    id: 6,
    image: Cus6,
    name: "Beckett Frey",
    review:
      "Finding a reliable vet has never been easier! I booked a consultation through the website, and within minutes, I had an appointment scheduled. The vet was professional and knowledgeable. I appreciate the effort in creating a platform that truly prioritizes pet health and convenience for pet owners.",
    rating: 3.5,
  },
  {
    id: 7,
    image: Cus7,
    name: "Ron Surge",
    review:
      "I love how this site connects pet lovers to everything they need in one place! I ordered pet toys, food, and even got recommendations on training techniques. The delivery was quick, and the quality of the products was top-notch. Will definitely be using this service regularly!",
    rating: 5,
  },
  {
    id: 8,
    image: Cus8,
    name: "Mike Paul",
    review:
      "I was so happy to find a platform that offers everything for my rabbit in one place! From fresh hay and pellet food to chew toys and grooming kits, this site has it all. The customer support team was also super helpful when I had questions about the best bedding for my bunny. Fast delivery, great quality products, and a user-friendly experience—this is now my go-to site!",
    rating: 4,
  },
  {
    id: 9,
    image: Cus9,
    name: "Clark Watts",
    review:
      "As a proud cat parent, I’m very picky about where I buy food and accessories for my fur baby. This website exceeded my expectations! The variety of cat food options, scratch posts, and interactive toys is fantastic. My cat absolutely loves the organic treats I ordered. Plus, the vet consultation feature gave me great advice on managing her diet. Highly recommended!",
    rating: 4.5,
  },
  {
    id: 10,
    image: Cus10,
    name: "Sam Windsor",
    review:
      "Finding good quality turtle food and habitat accessories has always been a struggle—until now! This website had everything I needed, from water filters to calcium supplements. The ‘Know Your Little Friend’ section even helped me understand my turtle’s diet better. It’s rare to find a pet store that caters to exotic pets too. Absolutely love it!",
    rating: 5,
  },
];

// Styled Components
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  padding: 50px 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 30px 10px;
  }
`;

const Title = styled.h2`
  font-family: "Montaga", serif;
  font-size: 40px;
  font-weight: bold;
  color: #fc9657;
  text-align: center;
  margin-bottom: 60px;
  margin-top: -80px;

  @media (max-width: 768px) {
    font-size: 30px;
    margin-bottom: 30px;
    margin-top: -40px;
  }
`;

const CardContainer = styled.div`
  width: 1350px;
  height: 570px;
  display: flex;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.5s ease-in-out;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: column;
    border-radius: 10px;
  }
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  background-image: ${({ img }) => img ? `url(${img})` : "none"};
  background-size: cover;
  background-position: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;

const ReviewContainer = styled.div`
  width: 50%;
  background: #fc9657; /* Orange background */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const ReviewText = styled.p`
  font-family: "Montaga", serif;
  font-size: 20px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ReviewerName = styled.h3`
  font-family: "Montaga", serif;
  font-size: 30px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Stars = styled.div`
  font-size: 40px;
  color: #ffd700; /* Gold stars */

  @media (max-width: 768px) {
    font-size: 30px;
  }
`;

// Main Component
const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <Title>What Our Customers Say about FurGo</Title>
      <CardContainer key={reviews[currentIndex].id}>
        <ImageContainer img={reviews[currentIndex].image} />
        <ReviewContainer>
          <ReviewerName>{reviews[currentIndex].name}</ReviewerName>
          <ReviewText>"{reviews[currentIndex].review}"</ReviewText>
          <Stars>{"★".repeat(reviews[currentIndex].rating)}</Stars>
        </ReviewContainer>
      </CardContainer>
    </Section>
  );
};

export default ReviewsCarousel;