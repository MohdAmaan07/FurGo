import React from "react";
import img2 from "./assets/dog4.jpeg";
import img3 from "./assets/dog5.jpeg";
import img4 from "./assets/owl.jpeg";
import img6 from "./assets/deer.jpeg";
import img8 from "./assets/pet4.jpeg";
import img9 from "./assets/Cus9.jpeg";
import img10 from "./assets/Cus6.jpeg";
import img11 from "./assets/dog1.jpeg";
import img12 from "./assets/bird1.jpeg";
import img13 from "./assets/wolf.jpg";
import img14 from "./assets/Cus10.jpeg";
import img15 from "./assets/cat2.jpg";
import img17 from "./assets/hamster.jpg";
import img18 from "./assets/swan1.jpg";
import img19 from "./assets/rabbit1.jpg";

const images = [
  { src: img2, label: "Joy", rotation: "5deg", size: "250px" },
  { src: img3, label: "Classy", rotation: "-15deg", size: "250px" },
  { src: img4, rotation: "8deg", size: "200px" },
  { src: img6, rotation: "12deg", size: "250px" },
  { src: img8, label: "Cute", rotation: "7deg", size: "200px" },
  { src: img9, rotation: "15deg", size: "200px" },
  { src: img10, rotation: "-12deg", size: "250px" },
  { src: img11, label: "Love", rotation: "10deg", size: "200px" },
  { src: img12, rotation: "-10deg", size: "250px" },
  { src: img13, rotation: "8deg", size: "250px" },
  { src: img14, label: "Smiles", rotation: "-5deg", size: "200px" },
  { src: img15, rotation: "12deg", size: "200px" },
  { src: img17, label: "Loyalty", rotation: "5deg", size: "200px" },
  { src: img18, rotation: "-8deg", size: "150px" },
  { src: img19, label: "Friends", rotation: "7deg", size: "250px" },
];

const PhotoCollage = () => {
  const collageContainerStyle = {
    position: "relative",
    width: "100%", // Use full width instead of fixed width
    maxWidth: "1200px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    padding: "2px",
    boxSizing: "border-box",
    margin: "0 auto", // Centers the container
  };
  
  const collageGridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px", // Positive gap for spacing
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    justifyContent: "center",
  };

  const titleStyle = {
    fontSize: "45px",
    fontWeight: "bold",
    marginBottom: "70px",
    textAlign: "center",
    color: "purple",
    textTransform: "uppercase",
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
  };

  const collageItemStyle = {
    position: "relative",
    transition: "transform 0.5s ease-in-out",
  };

  return (
    <div style={collageContainerStyle}>
      <h2 style={titleStyle}>Our Family Gallery</h2>
      <div style={collageGridStyle}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              ...collageItemStyle,
              transform: `rotate(${image.rotation})`,
              width: image.size, // Set width dynamically
              height: image.size, // Set height dynamically
            }}
          >
            <img
              src={image.src}
              alt={`Collage ${index}`}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
                objectFit: "cover", // Ensures the image covers the area without distortion
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoCollage;