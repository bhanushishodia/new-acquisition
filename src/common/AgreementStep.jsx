import React, { useState, useEffect } from 'react';

import axios from 'axios';

import DigitalSignatureForm from './DigitalSignatureForm'; // Import the new DigitalSignatureForm component

import { primaryApiBaseUrl, secondaryApiBaseUrl } from "../utils/constant";
import { getImage } from "../utils/getImage";


const Documents = getImage("Docs.png");
const pdfFile = "../pdf/Agreement-Content.pdf";
const AgreementStep = ({ onNext, formData, totalPrice, onPaymentSuccess, setCurrentStep }) => {

  const [isSigned, setIsSigned] = useState(false); // Track if user has signed
  useEffect(() => {
    // You can trigger the payment verification when the component mounts, if required.
  }, []);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function handleRazorpayPayment() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const amount = localStorage.getItem("totalPrice");
    // const result = await axios.post("http://localhost:5000/api/payments/orders", { amount });
    const result = await axios.post(`${secondaryApiBaseUrl}payments/orders`, { amount });


    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { id: order_id, currency } = result.data;
    debugger;
    const options = {
      key: "rzp_live_URnVqw6ym6ThfW", // Replace with your Razorpay Key ID
      amount: (amount * 100).toString(), // Ensure amount is converted to paise
      currency: currency || "INR", // Default to INR if currency is not provided
      name: "Anantya.ai", // Merchant/Company name
      description: `Payment of ₹${(amount / 100).toFixed(2)}`, // Dynamic description
      order_id: order_id, // Razorpay Order ID generated from your backend
      handler: async function (response) {
        try {
          // Send payment details to your backend for verification
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          // Send the response data to your backend for verification
          // const result = await axios.post("http://localhost:5000/payment/success", data);
          const result = await axios.post(`${secondaryApiBaseUrl}payment/success`, data);


          // Check the response from your backend
          if (result.data.message === "Payment verification route working!") {
            // Redirect user to a success page
            onPaymentSuccess();  // This will move to the CompletionStep in DIYPopup.js

          } else {
            alert("Payment verification failed. Please try again.");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          alert("Payment verification failed. Please try again.");
        }
      },
      prefill: {
        name: "Anantya.ai", // Pre-fill customer's name
        email: "info@anantya.ai", // Pre-fill customer's email
        contact: "91987015606", // Pre-fill customer's contact number
      },
      notes: {
        address: "Anantya.ai", // Add any additional note or address
      },
      theme: {
        color: "#61dafb", // Razorpay checkout theme color
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  const getStatus = (status) => {
    if (status.toLowerCase() === "completed") {
      setIsSigned(true)
    }

  }
  return (
    <div className="step-content w-100">
      <h5 className='mt-4'>Ready to Sign Your Agreement?</h5>
      {/* Agreement Section */}
      {/* Left Side: Agreement PDF */}
      <div className="agreement-pdf text-center d-flex flex-wrap">
        <div className="my-auto col-12 col-md-6 px-3 py-3 text-center mx-auto">
          <img
            src={Documents}
            className="img-fluid mb-4"
            alt="Doucuments"
            style={{
              width: "80px",
              height: "80px",
            }}
          />
          <div className="card-title h5">Let’s Make It Official</div>
          <p className='fw-lighter'>Read the terms, sign, and get started   <br />  immediately.  You’re in the right  <br /> hands, let's make it official !</p>
          <div>
            <DigitalSignatureForm getStatus={getStatus} formData={formData} />
          </div>

        </div>
        <div className=" card shadow-sm col-12 col-md-6 text-center mt-3 mx-auto">
          <div className="card-body text-center d-flex flex-column align-items-center   justify-content-end p-0">
            <h6 className="card-title strip w-100">Preview of Terms & Conditions</h6>


            {/* PDF Preview */}
            <div className="pdf-box d-block">
              <object
                data={pdfFile}
                type="application/pdf"
                width="100%"
                height='275px'>
                <p>Your browser does not support inline PDF viewing. <a href={pdfFile}>Download the PDF</a>.</p>
              </object>
            </div>
          </div>
        </div>
      </div>

      <form className="d-flex flex-column flex-md-row align-items-center mt-3 justify-content-between">
      {/* Razorpay payment button */}
          <button
            type="button"
            onClick={() => { isSigned && handleRazorpayPayment(); }}
            disabled={!isSigned} // Dynamically disable the button
            className={`btn-submit w-25  end-0 ms-md-auto text-black bottom-0  ${!isSigned ? "disabled" : ""}`}>
            Proceed to Pay  
          </button>
      </form>

    </div>
  );
};

export default AgreementStep;
