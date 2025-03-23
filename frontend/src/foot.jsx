import React from "react";
import dogImage from "./assets/dog7.png"; // Add your dog image
import cartIcon from "./assets/FurGo.png"; // Add your cart icon
import background from "./assets/background.png"; // Add background if needed

const PetShopHero = () => {
  return (
    <div style={styles.heroContainer}>
      {/* Background Elements */}
      <div style={{ ...styles.backgroundImage, backgroundImage: `url(${background})` }}></div>

      {/* Text Content */}
      <div style={styles.textContent}>
        <div style={styles.speechBubble}>
          <span style={styles.wooText}>WOO</span>
          <span style={styles.fText}>F!!!</span>
        </div>
        <h1>
          All for Your{" "}
          <span style={styles.highlightText}>Pet Shop!</span>
          <br /> & Woo compatible.
        </h1>
        <p>
          You get a neat set of shop page layouts & full compatibility with WooCommerce.
        </p>
        <button style={styles.viewMoreBtn}>View more</button>
      </div>

      {/* Dog Image */}
      <div style={styles.dogContainer}>
        <img src={dogImage} alt="Dog" style={styles.dogImage} />
      </div>

      {/* Floating Cart Section */}
      <div style={styles.cartContainer}>
        <img src={cartIcon} alt="Cart Icon" style={styles.cartIcon} />
        <div style={styles.cartItems}>
          <div style={styles.cartItem}>
            <span>Rain Coat</span>
            <span style={styles.price}>$58</span>
          </div>
          <div style={styles.cartItem}>
            <span> Fur Coat</span>
            <span style={styles.price}>$58</span>
          </div>
          <div style={styles.cartActions}>
            <span style={styles.cartLink}>Cart</span> |{" "}
            <span style={styles.checkoutLink}>Checkout</span>
          </div>
        </div>
      </div>

      {/* Product Box */}
      <div style={styles.productBox}>
        <h3>Dog Leather Jacket</h3>
        <p style={styles.productPrice}>$58</p>
        <button style={styles.addToCartBtn}>Add to cart</button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  heroContainer: {
    position: "relative",
    width: "99vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5%",
    overflow: "hidden", // Prevents any element from overflowing
    backgroundColor: "#fff",
    boxSizing: "border-box", // Ensures padding doesn't increase width
  },

  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "0.3",
    zIndex: "1",
  },

  textContent: {
    maxWidth: "500px",
    zIndex: "2",
  },

  speechBubble: {
    display: "inline-block",
    backgroundColor: "#8c63b8",
    color: "white",
    fontSize: "2.5rem",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "20px",
    position: "relative",
    top: "-10px",
    zIndex: "2",
  },

  wooText: {
    fontSize: "3rem",
    zIndex: "2",
  },

  fText: {
    fontSize: "3rem",
    color: "black",
    marginLeft: "1px",
    zIndex: "2",
  },

  highlightText: {
    backgroundColor: "purple",
    color: "white",
    padding: "4px 8px",
    borderRadius: "5px",
    zIndex: "2",
  },

  viewMoreBtn: {
    backgroundColor: "orange",
    color: "white",
    fontSize: "1.2rem",
    border: "none",
    padding: "10px 20px",
    marginTop: "20px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "0.3s ease-in-out",
    zIndex: "2",
  },

  dogContainer: {
    position: "relative",
    zIndex: "2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "30%",
    left: "-200px"

  },

  dogImage: {
    width: "800px",
    maxWidth: "400px",
    left: "-900px"
  },

  cartContainer: {
    position: "absolute",
    top: "10%",
    right: "5%", // Fixed to fit inside viewport
    background: "rgba(26, 214, 173, 0.67)",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
    zIndex: "2",
    // right: "600px"
  },

  cartIcon: {
    width: "65px",
    cursor: "pointer",
  },

  cartItems: {
    marginTop: "2px",
  },

  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    marginBottom: "5px",
  },

  price: {
    color: "purple",
  },

  cartActions: {
    fontSize: "14px",
    marginTop: "5px",
  },

  cartLink: {
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },

  checkoutLink: {
    color: "purple",
    fontWeight: "bold",
    cursor: "pointer",
  },

  productBox: {
    position: "absolute",
    bottom: "5%",
    right: "5%", // Adjusted to fit within viewport
    background: "rgba(214, 156, 248, 0.8)",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
    textAlign: "center",
    zIndex: "2",
    width: "200px",
    height: "150px",
  },

  productPrice: {
    color: "black",
    fontSize: "23px",
    fontWeight: "bold",
    marginBottom: "13px",
    marginTop: "11px",
  },

  addToCartBtn: {
    backgroundColor: "purple",
    color: "white",
    fontSize: "1rem",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default PetShopHero;
