import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaFilter, FaShoppingCart, FaSearch } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TopNavbar from "./TNav";
import Footer from "./footer";
import BottomNav from "./BNav";

import C3 from "./assets/C3.png";
import C4 from "./assets/C4.png";
import C5 from "./assets/C5.png";
import PetShopHero from "./foot";

// Styled Components
const StoreContainer = styled.div`
  width: 97%;
  margin: auto;
  padding: 20px;
  font-family: "Montaga", serif;
  background-color: rgba(88, 233, 165, 0.73);
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  position: relative;
`;

const ProductGrid = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  justify-content: center;
`;

const ProductCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  padding: 30px;
  text-align: center;
  position: relative;
  border-radius: 10px;
  width: 350px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ProductName = styled.h3`
  margin: 10px 0;
  font-size: 18px;
`;

const AddToCartButton = styled.button`
  background: #ff6600;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    background: #cc5500;
  }
`;

const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const PageButton = styled.button`
  background: #ff6600;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #cc5500;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    fetchProducts("http://127.0.0.1:8000/store/products/");
  }, []);

  const fetchProducts = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <>
      <TopNavbar />
      <BottomNav />
      <StoreContainer>
        {/* Product Grid */}
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.images[0] || "/default-image.jpg"} alt={product.title} />
              <ProductName>{product.title}</ProductName>
              <p>${product.unit_price}</p>
              <AddToCartButton>Add to Cart</AddToCartButton>
            </ProductCard>
          ))}
        </ProductGrid>

        {/* Pagination */}
        <PaginationButtons>
          <PageButton disabled={!prevPage} onClick={() => fetchProducts(prevPage)}>Previous</PageButton>
          <PageButton disabled={!nextPage} onClick={() => fetchProducts(nextPage)}>Next</PageButton>
        </PaginationButtons>
      </StoreContainer>
      <PetShopHero />
      <Footer />
    </>
  );
};

export default StorePage;
