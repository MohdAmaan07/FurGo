import React, { useState } from "react";
import styled from "styled-components";
import { FaFilter, FaShoppingCart, FaSearch } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

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
  background-color:rgba(88, 233, 165, 0.73)  
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
  position: relative;
`;

// Search Bar Container
const SearchContainer = styled.div`
  position: relative;
  width: 50%;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 12px 45px 12px 40px; /* Left padding for icon */
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 15px;
  outline: none;
  text-align: left;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease-in-out;

  &:focus {
    border-color: #ff6600;
    box-shadow: 0px 4px 12px rgba(255, 102, 0, 0.4);
  }
`;

// Search Icon inside input field (left side)
const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 16px;
`;

// Search Button inside input field (right side)
const SearchButton = styled.button`
  position: absolute;
  width: 80px;
  height: 40px;
  right: -75px;
  top: 50%;
  transform: translateY(-50%);
  background: #ff6600;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    background: #cc5500;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: absolute;
  right: 0;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
  position: relative;

  &:hover {
    color: #ff6600;
  }
`;

// Filter Dropdown
const FilterDropdown = styled.div`
  position: absolute;
  background: white;
  border-radius: 10px;
  padding: 15px;
  top: 40px;
  right: 0;
  min-width: 200px;
  display: ${({ show }) => (show ? "block" : "none")};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
`;

const FilterTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 10px;
  text-align: center;
  color: #ff6600;
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #444;
  transition: 0.2s;

  &:hover {
    color: #ff6600;
    font-weight: bold;
  }

  input {
    accent-color: #ff6600;
  }
`;

// Carousel Container
const CarouselContainer = styled.div`
  width: 99.5%;
  margin-bottom: 20px;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
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
  left: 90px;
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

const productsData = [
  { id: 1, name: "Pet Food", image: "/product1.jpg", category: "Food" },
  { id: 2, name: "Dog Toy", image: "/product2.jpg", category: "Toys" },
  { id: 3, name: "Cat Bed", image: "/product3.jpg", category: "Beds & Homes" },
  { id: 4, name: "Chew Bone", image: "/product4.jpg", category: "Food" },
  { id: 5, name: "Bird Feeder", image: "/product5.jpg", category: "Birds" },
  { id: 6, name: "Collar", image: "/product6.jpg", category: "Accessories" },
];

// Carousel Images
const carouselImages = [
  C3,
  C4,
  C5,
];

const StorePage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const filteredProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || product.category === filter)
  );

  // Carousel Settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (

    <>
    <TopNavbar />
    <BottomNav />
    <StoreContainer>
      {/* Search Bar & Icons */}
      <TopBar>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchButton>Search</SearchButton>
        </SearchContainer>

        <IconsContainer>
          {/* Filter Icon */}
          <IconButton onClick={() => setShowFilter(!showFilter)}>
            <FaFilter />
            <FilterDropdown show={showFilter}>
              <FilterTitle>Filter By Category</FilterTitle>
              {["All", "Food", "Toys", "Beds & Homes", "Accessories", "Birds", "Med Care"].map((category) => (
                <FilterOption key={category}>
                  <input
                    type="radio"
                    name="filter"
                    value={category}
                    checked={filter === category || (category === "All" && filter === "")}
                    onChange={() => setFilter(category === "All" ? "" : category)}
                  />
                  {category}
                </FilterOption>
              ))}
            </FilterDropdown>
          </IconButton>

          {/* Cart Icon */}
          <Link to="/checkout" >
          <IconButton>
           <FaShoppingCart />
          </IconButton>
          </Link>
        </IconsContainer>
      </TopBar>

      {/* Carousel */}
      <CarouselContainer>
        <Slider {...carouselSettings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <CarouselImage src={image} alt={`Carousel ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </CarouselContainer>

      {/* Product Grid */}
      <ProductGrid>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <AddToCartButton>Add to Cart</AddToCartButton>
          </ProductCard>
        ))}
      </ProductGrid>
    </StoreContainer>
    <PetShopHero />
    <Footer />
    </>
  );
};

export default StorePage;