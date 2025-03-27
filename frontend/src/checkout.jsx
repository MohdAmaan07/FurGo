import React, { useState } from "react";
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

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const navigate = useNavigate();

  // Original price before discount
  const originalPrice = 119.99;
  const discount = (originalPrice * 29) / 100;
  const finalPrice = originalPrice - discount;

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
          <p>🐶 Dog Food - Chicken Flavor (5kg)</p>
          <p>🛁 Pet Shampoo - Anti-Flea (500ml)</p>
          <p>🏠 Pet Bed - Soft & Cozy</p>
          <hr />
          <p>Original Price: ${originalPrice.toFixed(2)}</p>
          <p>Discount (29%): -${discount.toFixed(2)}</p>
          <hr />
          <h3>Total: ${finalPrice.toFixed(2)}</h3>
        </Summary>
      </PaymentContainer>
    </CheckoutContainer>
    </>
  );
};

export default CheckoutPage;
