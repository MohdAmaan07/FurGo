import React from "react";
import image1 from "./assets/Cus10.jpeg";
import image2 from "./assets/dog8.jpeg"; // Bigger Image
import image3 from "./assets/dog9.jpeg";
import image4 from "./assets/Cus9.jpeg"; // Bigger Image

const PetInsightsGrid = () => {
  return (
    <div style={styles.container}>
      {/* Title with color block behind specific words */}
      <h1 style={styles.title}>
       What is the Need to Know{" "}
        <span style={styles.highlight}>Your Companion ?</span>
        ?
      </h1>

      <div style={styles.gridContainer}>
        {/* Smaller Image */}
        <div style={{ ...styles.gridItem, ...styles.image, backgroundImage: `url(${image1})`, gridColumn: "1 / span 1", gridRow: "1 / span 1" }}></div>

        {/* Bigger Image (Takes 2 rows) */}
        <div style={{ ...styles.gridItem, ...styles.image, backgroundImage: `url(${image2})`, gridColumn: "2 / span 1", gridRow: "1 / span 2" }}></div>

        {/* Text Box - Fixed Position */}
        <div style={{ ...styles.gridItem, ...styles.textBox, gridColumn: "1 / span 1", gridRow: "2 / span 1" }}>
          <h3>How ImPoRtaNT is It to KnoW abouT YoUr Pet?</h3>
        </div>

        {/* Smaller Image - Fixed Position */}
        <div style={{ ...styles.gridItem, ...styles.image, backgroundImage: `url(${image3})`, gridColumn: "1 / span 1", gridRow: "3 / span 1" }}></div>

        {/* Bigger Image - Fixed Position (Spans 2 Rows) */}
        <div style={{ ...styles.gridItem, ...styles.image, backgroundImage: `url(${image4})`, gridColumn: "2 / span 1", gridRow: "3 / span 2" }}></div>

        {/* Text Box - Fixed Position */}
        <div style={{ ...styles.gridItem, ...styles.textBox, gridColumn: "1 / span 1", gridRow: "4 / span 1" }}>
          Understanding your pet’s behavior, health, and emotions helps build trust, ensures proper care, prevents issues, and strengthens your lifelong companionship.
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Montaga",
    marginBottom: "50",
    marginTop: "100px",

  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "50px",
    marginTop: "40px",

  },
  highlight: {
    backgroundColor: "rgb(241, 118, 36)", // Same tomato red as text box
    padding: "5px 10px",
    borderRadius: "2px",
    color: "white",
  },
  gridContainer: {
    display: "grid",
    gap: "10px",
    padding: "15px",
    maxWidth: "800px",
    margin: "auto",
    gridTemplateColumns: "repeat(2, 1fr)", // Two equal columns
    gridTemplateRows: "repeat(4, 180px)", // Explicit row sizes to prevent overlap
  },
  gridItem: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  image: {
    backgroundColor: "#ddd",
  },
  textBox: {
    backgroundColor: "rgb(241, 118, 36)", // Tomato Red
    fontSize: "20px",
    padding: "15px",
    borderRadius: "8px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "400px",
    height: "150px",
    textAlign: "center",
  },
};

export default PetInsightsGrid;
