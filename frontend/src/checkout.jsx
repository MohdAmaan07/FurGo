import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCheckCircle, FaUser, FaMoneyCheckAlt, FaStream } from "react-icons/fa";
import { SiPaypal, SiPaytm } from "react-icons/si";
import { useNavigate } from "react-router-dom"; // For navigation
import visaLogo from "./assets/visa.png";
import mastercardLogo from "./assets/mastercard-logo.png";
import gpayLogo from "./assets/Google_Pay_Logo.svg.png"; // Importing Google Pay logo
import TopNavbar from "./TNav";
import BottomNav from "./BNav";
import Card from "./checkoutbutton";

// Add the dynamic base URL function
const getBaseUrl = () => {
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://127.0.0.1:8000'
    : 'https://furgo.onrender.com';
};

// Styled Components
const CheckoutContainer = styled.div`
  width: 80%;
  margin: auto;
  font-family: "Arial", sans-serif;
  padding: 20px;
  margin-bottom: 100px;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 2px solid #ddd;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  color: ${(props) => (props.active ? "#27ae60" : "#aaa")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PaymentContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const PaymentForm = styled.div`
  flex: 2;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Summary = styled.div`
  flex: 1;
  background:rgb(195, 243, 241);
  padding: 20px;
  border-radius: 10px;
`;

const Input = styled.input`
  width: 96%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: ${(props) => (props.primary ? "#27ae60" : "#ccc")};
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background: ${(props) => (props.primary ? "#219150" : "#bbb")};
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  font-size: 16px;
  cursor: pointer;
`;

const PaymentLogo = styled.img`
  width: 55px;
`;

const CartItem = styled.div`
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px dashed #aaa;
  
  &:last-child {
    border-bottom: none;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-style: italic;
  color: #777;
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 20px 0;
  
  h3 {
    margin-bottom: 15px;
    color: #e74c3c;
  }
  
  button {
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
      background: #2980b9;
    }
  }
`;

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingCart, setUpdatingCart] = useState(false);
  const navigate = useNavigate();

  // Calculate prices based on cart data
  const calculatePrices = () => {
    if (!cartData || !cartData.items || cartData.items.length === 0) {
      return {
        originalPrice: 0,
        discount: 0,
        finalPrice: 0
      };
    }
    
    // Use the total_price from the API directly
    const originalPrice = parseFloat(cartData.total_price);
    
    // Apply a 5% discount as an example
    const discountRate = 0.05;
    const discount = originalPrice * discountRate;
    const finalPrice = originalPrice - discount;
    
    return {
      originalPrice,
      discount,
      finalPrice
    };
  };

  // Fetch cart data
  const fetchCart = async () => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`${getBaseUrl()}/store/carts/${cartId}/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      
      const data = await response.json();
      setCartData(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Could not load your cart. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateItemQuantity = async (itemId, quantity) => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;
    
    try {
      setUpdatingCart(true);
      const response = await fetch(`${getBaseUrl()}/store/carts/${cartId}/items/${itemId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update cart');
      }
      
      // Refresh the cart data
      await fetchCart();
    } catch (err) {
      console.error('Error updating cart:', err);
      alert('Could not update item quantity. Please try again.');
    } finally {
      setUpdatingCart(false);
    }
  };

  // Remove item from cart
  const removeItem = async (itemId) => {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) return;
    
    if (!confirm('Are you sure you want to remove this item?')) return;
    
    try {
      setUpdatingCart(true);
      const response = await fetch(`${getBaseUrl()}/store/carts/${cartId}/items/${itemId}/`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove item');
      }
      
      // Refresh the cart data
      await fetchCart();
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Could not remove item. Please try again.');
    } finally {
      setUpdatingCart(false);
    }
  };

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCart();
  }, []);
  // Calculate prices from cart data
  const { originalPrice, discount, finalPrice } = calculatePrices();

  return (
    <>
    <TopNavbar />
    <BottomNav />
    <CheckoutContainer>
      {/* Progress Bar with Icons from React Icons */}
      <ProgressBar>
        <Step active>
          <FaStream size={35} />
         Complete Shopping <FaCheckCircle />
        </Step>
        <Step active>
          <FaUser size={35} />
          Your Personal Details <FaCheckCircle />
        </Step>
        <Step active>
          <FaMoneyCheckAlt size={35} />
          Payment Method
        </Step>
      </ProgressBar>

      <PaymentContainer>
        {/* Payment Form */}
        <PaymentForm>
          <h2>Choose your payment method</h2>

          <Label>
            <input
              type="radio"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            <SiPaypal size={35} color="#00457C" />
            <PaymentLogo src={gpayLogo} alt="Google Pay" />
            <SiPaytm size={45} color="#00baf2" /> <h4>Online Payment</h4>
          </Label>

          <Label>
            <input
              type="radio"
              name="payment"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={() => setPaymentMethod("credit")}
            />
            <PaymentLogo src={visaLogo} alt="Visa" />
            <PaymentLogo src={mastercardLogo} alt="Mastercard" /> <h4>Credit Card </h4>
          </Label>

          {paymentMethod === "credit" && (
            <>
              <h3>Credit Card Details</h3>
              <Input type="text" placeholder="Credit Card Number" />
              <Input type="text" placeholder="CVV Code" />
              <Input type="text" placeholder="Expiry Date (MM/YY)" />
              <Input type="text" placeholder="Name on Card" />
            </>
          )}
          <Card />

          <Button onClick={() => navigate("/store")}>GO BACK</Button>
        </PaymentForm>

        {/* Order Summary */}
        <Summary>
          <h2>Summary</h2>
          
          {loading ? (
            <LoadingMessage>Loading your cart...</LoadingMessage>
          ) : error ? (
            <p>{error}</p>
          ) : !cartData || cartData.items.length === 0 ? (
            <EmptyCartMessage>
              <h3>Your cart is empty</h3>
              <button onClick={() => navigate('/store')}>Continue Shopping</button>
            </EmptyCartMessage>
          ) : (
            <>
              {/* Display cart items */}
              {cartData.items.map(item => (
                <CartItem key={item.id}>
                  <p>
                    {item.product.title} - ${item.product.unit_price} × {item.quantity}
                  </p>
                </CartItem>
              ))}
              
              <hr />
              <p>Original Price: ${originalPrice.toFixed(2)}</p>
              <p>Discount (5%): -${discount.toFixed(2)}</p>
              <hr />
              <h3>Total: ${finalPrice.toFixed(2)}</h3>
            </>
          )}
        </Summary>
      </PaymentContainer>
    </CheckoutContainer>
    </>
  );
};

export default CheckoutPage;