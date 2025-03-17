import React, { useState } from "react";

const faqData = [
  { question: "Q1. What should I consider before adopting a pet?", answer: "Before adopting a pet, consider factors like your lifestyle, available time, space at home, and financial responsibility for food, healthcare, and grooming." },
  { question: "Q2. What documents do I need for pet adoption?", answer: "Most adoption centers require proof of identity, address, and sometimes a reference or home visit to ensure a suitable environment for the pet." },
  { question: "Q3. How much does it cost to adopt a pet?", answer: "Adoption fees vary depending on the shelter and the pet’s age, breed, and medical history. Some shelters offer free adoptions, but you should also budget for vaccinations, food, and medical care." },
  { question: "Q4. Can I adopt a pet if I live in an apartment?", answer: "Yes, but it's important to choose a pet that suits your living space. Small dogs, cats, or even rabbits can be good apartment pets. Some buildings have pet policies, so check before adopting." },
  { question: "Q5. How can I help my new pet adjust to their new home?", answer: "Give your pet time to adjust by creating a quiet, comfortable space. Provide food, water, toys, and regular attention. Be patient and establish a routine for feeding, exercise, and training." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const styles = {
    faqContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: "20px",
      fontFamily: "Montaga",
      marginTop: "100px"
    },
    faqLeft: {
      width: "52%",
    },
    faqRight: {
      width: "43%",
      marginTop: "-17px",
      marginLeft: "0px"
    },
    faqItem: {
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      marginBottom: "10px",
      padding: "10px",
      cursor: "pointer",
      border: "1px solid purple",
    },
    faqQuestion: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: 500,
      padding: "10px",
      fontSize: "20px"
    },
    faqIcon: {
      fontFamily: "Montaga, sans-serif",
      fontSize: "35px",
      color: " #ff6600",
      fontWeight: 600,
      cursor: "pointer",
    },
    faqAnswer: {
      padding: "10px",
      borderTop: "1px solid rgb(195, 98, 240)",
      color: "#444",
      fontSize: "19px",
    },
    faqRightText: {
      lineHeight: "1.4",
      color: "#333",
      fontSize: "18px"
    },
    listItem: {
      padding: "5px 0",
      color: "purple",
      fontSize: "16px",
    },
    faqContact: {
      fontSize: "28px",
      fontWeight: "bold",
      color: " #ff6600",
      marginTop: "5px",
    },
  };

  return (
    <div style={styles.faqContainer}>
      {/* Left Section (FAQs) */}
      <div style={styles.faqLeft}>
        {faqData.map((item, index) => (
          <div key={index} style={styles.faqItem}>
            <div style={styles.faqQuestion} onClick={() => toggleAnswer(index)}>
              <span>{item.question}</span>
              <span style={styles.faqIcon}>{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && <div style={styles.faqAnswer}>{item.answer}</div>}
          </div>
        ))}
      </div>

      {/* Right Section (Community Work & Contact) */}
      <div style={styles.faqRight}>
        <h1>Volunteering for Adoption</h1>
        <p style={styles.faqRightText}>
          Become a FurGo volunteer! Foster pets, assist in adoption events, spread awareness, or help with rescue operations. Your time and love can make a difference in giving pets a forever home! 🐾❤️
        </p>
        <ul>
          <li style={styles.listItem}>Online Support – Spread awareness, manage queries, and assist virtual adoptions.</li>
          <li style={styles.listItem}>Offline Assistance – Foster pets, coordinate paperwork, and support medical care.</li>
          <li style={styles.listItem}>On-Ground Service – Join rescue missions, adoption drives, and transport pets.</li>
          <li style={styles.listItem}>Creative Contributions – Design content, write blogs, and create adoption campaigns.</li>
        </ul>
        <h2>Call Center Available 24/7</h2>
        <p style={styles.faqRightText}>Our 24/7 adoption call center provides guidance, answers queries, and supports you in finding your perfect pet.</p>
        <p style={styles.faqContact}>+91 234–0973–789</p>
      </div>
    </div>
  );
};

export default FAQSection;
