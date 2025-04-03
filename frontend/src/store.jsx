import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaFilter, FaShoppingCart, FaSearch } from "react-icons/fa";
import Slider from "react-slick";
import TopNavbar from "./TNav";
import Footer from "./footer";
import BottomNav from "./BNav";
import PetShopHero from "./foot";

// Import carousel images
import C3 from "./assets/C3.png";
import C4 from "./assets/C4.png";
import C5 from "./assets/C5.png";

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
  left: 90px;
`;

const ProductImage = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ProductName = styled.h3`
  margin: 10px 0;
  font-size: 18px;
`;

const AddToCartButton = styled.button`
  background: ${props => props.disabled ? '#ccc' : '#ff6600'};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#cc5500'};
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

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 16px;
`;

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

const CartBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6600;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: white;
`;

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

const StorePage = () => {
  // API data states
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  
  // UI states
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState(""); 
  const [showFilter, setShowFilter] = useState(false);
  
  // Cart states
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState({});

  // Carousel images from static assets
  const carouselImages = [C3, C4, C5];

  // Get correct base URL based on environment
  const getBaseUrl = () => {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://127.0.0.1:8000'
      : 'https://furgo.onrender.com';
  };

  useEffect(() => {
    fetchProducts(`${getBaseUrl()}/store/products/`);
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;
    
    try {
      const response = await fetch(`${getBaseUrl()}/store/carts/${cartId}/`);
      if (response.ok) {
        const data = await response.json();
        setCartItemCount(data.items.length);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const fetchProducts = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.results);
      
      // Fix pagination URLs
      if (data.next) {
        setNextPage(data.next.replace('http://127.0.0.1:8000', getBaseUrl()));
      } else {
        setNextPage(null);
      }
      
      if (data.previous) {
        setPrevPage(data.previous.replace('http://127.0.0.1:8000', getBaseUrl()));
      } else {
        setPrevPage(null);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Filter products based on search and category
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === "" || product.collection === parseInt(filter))
  );

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Handle adding to cart
  const addToCart = async (productId) => {
    // Set loading state for this specific product
    setIsAddingToCart(prev => ({ ...prev, [productId]: true }));
    
    // Get cart ID from localStorage or create a new one
    let cartId = localStorage.getItem('cartId');
    
    try {
      if (!cartId) {
        const cartResponse = await fetch(`${getBaseUrl()}/store/carts/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!cartResponse.ok) throw new Error('Failed to create cart');
        
        const newCart = await cartResponse.json();
        localStorage.setItem('cartId', newCart.id);
        cartId = newCart.id;
      }
      
      // Add item to cart
      const response = await fetch(`${getBaseUrl()}/store/carts/${cartId}/items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, quantity: 1 })
      });
      
      if (!response.ok) throw new Error('Failed to add item to cart');
      
      // Update cart count
      setCartItemCount(prev => prev + 1);
      
      alert('Item added to cart!');
    } catch (error) {
      console.error("Cart error:", error);
      alert('Could not add to cart. Please try again.');
    } finally {
      // Clear loading state
      setIsAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
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
                {["All", "1", "2", "3", "4", "5", "6"].map((category) => (
                  <FilterOption key={category}>
                    <input
                      type="radio"
                      name="filter"
                      value={category}
                      checked={filter === category || (category === "All" && filter === "")}
                      onChange={() => setFilter(category === "All" ? "" : category)}
                    />
                    {category === "1" ? "Dog Essentials" : 
                     category === "2" ? "Cat Essentials" : 
                     category === "3" ? "Aquarium Essentials" : 
                     category === "4" ? "Bird Essentials" : 
                     category === "5" ? "Small Pet Essentials" : 
                     category === "6" ? "Grooming Essentials" : category}
                  </FilterOption>
                ))}
              </FilterDropdown>
            </IconButton>

            {/* Cart Icon with Badge */}
            <IconButton>
              <Link to="/checkout" style={{ position: 'relative' }}>
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <CartBadge>{cartItemCount}</CartBadge>
                )}
              </Link>
            </IconButton>
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage 
                  src={
                    product.images && product.images.length > 0 
                      ? product.images[0].image_url.replace('http://127.0.0.1:8000', getBaseUrl())
                      : "/default-image.jpg"
                  }
                  alt={product.title} 
                />
                <ProductName>{product.title}</ProductName>
                <p>${product.unit_price}</p>
                <AddToCartButton 
                  onClick={() => addToCart(product.id)}
                  disabled={isAddingToCart[product.id]}
                >
                  {isAddingToCart[product.id] ? 'Adding...' : 'Add to Cart'}
                </AddToCartButton>
              </ProductCard>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </ProductGrid>

        {/* Pagination */}
        <PaginationButtons>
          <PageButton disabled={!prevPage} onClick={() => fetchProducts(prevPage)}>
            Previous
          </PageButton>
          <PageButton disabled={!nextPage} onClick={() => fetchProducts(nextPage)}>
            Next
          </PageButton>
        </PaginationButtons>
      </StoreContainer>
      <PetShopHero />
      <Footer />
    </>
  );
};

export default StorePage;