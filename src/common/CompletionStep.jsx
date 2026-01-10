import React, { useState, useEffect } from "react";
import { primaryApiBaseUrl, secondaryApiBaseUrl } from "../utils/constant";
import { getImage } from "../utils/getImage";

const gif = getImage("final.gif");

const CompletionStep = ({sendWhatsAppMessage}) => {
  // State for handling API status
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false); // Show alert state
  useEffect(() => {
   sendWhatsAppMessage("97") 
   }, []);
 

  // Define the function to make the API call
  const handleApiCall = async () => {
    const apiUrl = "https://hubapi.anantya.ai/api/Onboarding/OnboardFromSite";
    const data = {
      SubDomainName: "harshalnew", // Update these values as needed
      CompanyName: "harshal",
      CompanyPersonName: "harshal",
      CompanyPersonEmail: "harshal@nosnia.com",
      DomainName: "anantya.ai",
      PlanIds: "1",
    };

    setLoading(true); // Show loading indicator
    setMessage(""); // Clear any previous messages
    setShowAlert(false); // Hide any previous alert
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      // console.log("API response:", result);

      // Show success alert
      setShowAlert(true);
      // Redirect to homepage after success
      window.location.href = "/";  // Redirect to homepage 
    } catch (error) {
      console.error("Error during API call:", error);
      setMessage("Error: Unable to process your request. Please try again."); // Show error message
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="step-content w-100">
      <h5 className="mt-4">You're Officially All Set! 🎉</h5>
      <p className="fw-lighter my-2">
        Your payment has been successfully processed, and you're ready to unlock <br />
        all the amazing benefits we've got in store for you!
      </p>
      <strong>Thank you for trusting us to be a part of your journey 🌟</strong>
      <img
        src={gif}
        className="img-fluid my-4"
        alt="Completion Animation"
        style={{ width: "120px", height: "120px", display: "block", margin: "0 auto" }}
      />

      <p className="font">
        Ready to dive deeper? Whether you're looking for more exciting <br /> updates,
        tutorials, or insightful reads, we've got you covered.
      </p>

      {showAlert && (
        <div className="alert alert-success top-right-alert">
          Success! Your request has been processed.
        </div>
      )}

      {message && <div className="alert alert-info mt-3">{message}</div>} {/* Show success/error message */}
      {loading && <p>Loading...</p>} {/* Show loading state */}


      <button
        type="button"
        onClick={handleApiCall} // Call the API when the button is clicked
        className="btn btn-primary btn-lg rounded-3 my-2"
        disabled={loading} // Disable the button while loading
      >
        {loading ? "Processing..." : "Explore Our Website"}
      </button>
    </div>
  );
};

export default CompletionStep;
