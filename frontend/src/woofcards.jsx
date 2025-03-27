import React, { useState } from "react";
import styled from "styled-components";

import dog from "./assets/dog5.jpeg";
import cat from "./assets/pet8.jpeg";
import bird from "./assets/bird1.jpeg";

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin-top: 50px;
`;

const CardWrapper = styled.div`
  position: relative;
  width: 1100px;
  height: 330px;
`;

const Card = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 15px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.5s ease-in-out, z-index 0.5s;

  ${(props) =>
    props.isActive
      ? `
    z-index: 10;
    transform: scale(1);
  `
      : `
    z-index: 0;
    transform: scale(0.9) translate(30px, 30px);
  `}
`;

const ImageSection = styled.div`
  width: 35%;
  background: #e0c3fc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -30px; /* Moves the text section slightly up */;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: #ff5733; /* Title color */
  margin-bottom: 10px;
`;

const Review = styled.p`
  font-size: 20px;
  color: #666;
`;

// Testimonial Data
const testimonials = [
  {
    id: 1,
    review:"Dogs bark to express excitement fear or alertness. A happy bark means You're back Let’s play! while a growl warns Stay away! Whining often signals I need attention! and those endless barks at the mailman Just their way of saying Intruder alert!",
    image: dog,
  },
  {
    id: 2,
    review:"Cats are more mysterious but just as vocal. A soft meow means Feed me! while purring says I’m loving this! Hissing warns Back off! and those midnight meows Probably a dramatic way of saying Why are you sleeping when I need attention?",
    image: cat,
  },
  {
    id: 3,
    review:"Birds the chatterboxes sing to greet the day and squawk for attention. A cheerful chirp says I’m happy! while a loud screech means Look at me! Some even mimic words making them the ultimate little talkers of the pet world.",
    image: bird,
  },
];

const TestimonialCard = () => {
  const [index, setIndex] = useState(0);

  const handleClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <Container>
      <CardWrapper>
        {testimonials.map((testimonial, i) => (
          <Card key={testimonial.id} isActive={i === index} onClick={handleClick}>
            <ImageSection>
              <ProfileImage src={testimonial.image} alt="User" />
            </ImageSection>
            <InfoSection>
              <Title>What your pet wanna say?</Title>
              <Review>{testimonial.review}</Review>
            </InfoSection>
          </Card>
        ))}
      </CardWrapper>
    </Container>
  );
};

export default TestimonialCard;
