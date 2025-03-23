import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AccountActivation = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axios.post("http://localhost:8000/auth/users/activation/", {
          uid,
          token,
        });

        console.log("Account Activated", response.data);
        alert("Your account has been activated successfully!");

        // Redirect to login page
        navigate("/login");
      } catch (error) {
        console.error("Activation Error", error.response?.data || error.message);
        alert("Invalid or expired activation link.");
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Activating your account...</h2>
      <p>Please wait while we verify your activation link.</p>
    </div>
  );
};

export default AccountActivation;
