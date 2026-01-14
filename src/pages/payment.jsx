import React, { useState, useEffect } from "react";
import usePurchaseGuard from "../hooks/usePurchaseGuard";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import qrCode from "../assets/qr.jpeg"; // path adjust karo
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const Payment = () => {

  usePurchaseGuard(); //  ADD THIS LINE
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));
  const [showQR, setShowQR] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [neftTxnId, setNeftTxnId] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // danger | success | warning

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const [txnId, setTxnId] = useState("");
  if (!data) return <p>No payment data</p>;


  const addonsTotal = data.addons.reduce((s, a) => s + Number(a.price), 0);
  const discount = Number(data.coupon?.discount || 0);
  const setupFee = data.coupon?.setupFeeWaived ? 0 : data.setupFee;

  const total =
    Number(data.plan.price) +
    addonsTotal +
    setupFee -
    discount;

  const handlePayment = async () => {
    try {
      // 1️⃣ Create order
      // const orderRes = await axios.post(
      //   "http://localhost:5000/api/payments/orders",
      //   { amount: total }
      // );

      const orderRes = await axios.post(
        `${API_BASE}/api/payments/orders`,
        { amount: total }
      );
      const { order_id, amount } = orderRes.data;

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount,
        currency: "INR",
        name: "Anantya Platform",
        description: data.plan.name,
        order_id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${API_BASE}/api/payments/verify`,
              {
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,

                purchaseData: {
                  companyName: data.companyName,
                  name: data.name,
                  email: data.email,
                  mobile: data.mobile,
                  plan: data.plan,
                  addons: data.addons,
                  total,
                },

                
              }
            );
            // if (verifyRes.data.success) {
            //   navigate("/payment-success");
            // }

            window.location.href = "/payment-success";
          } catch (err) {
            setMessage("Payment completed but verification failed. Our team will review it.");
            setMessageType("warning");
          }

        },

        prefill: {
          name: data.name || data.companyName || "Customer",
          email: data.email || "",
          contact: data.mobile || "",
        },

        theme: {
          color: "#0d6efd",
        },
      };


      const rzp = new window.Razorpay(options);


      rzp.on("payment.failed", function (response) {
        setMessage(response.error.description || "Payment failed");
        setMessageType("danger");
      });


      rzp.open();
    } catch (err) {
      console.error("PAYMENT ERROR 👉", err);
      setMessage("Unable to initiate payment. Please try again.");
      setMessageType("danger");
    }

  };


  const handleQRSubmit = () => {
    if (!txnId) {
      setMessage("Please enter UPI / Transaction ID");
      setMessageType("danger");
      return;
    }

localStorage.setItem("qrPayment", JSON.stringify({
  txnId,
  amount: total,
  purchaseData: data,
  status: "PENDING",
  method: "UPI"
}));

    

    navigate("/payment-pending");
    setMessage("Payment details submitted successfully. Verification pending.");
    setMessageType("warning");

  };
  const handleNeftSubmit = () => {
    if (!neftTxnId) {
      setMessage("Please enter NEFT / Reference Number");
      setMessageType("danger");
      return;
    }


    localStorage.setItem(
      "neftPayment",
      JSON.stringify({
        referenceId: neftTxnId,
        amount: total,
        purchaseData: data,
        status: "PENDING",
        method: "NEFT",
        bank: "ICICI Bank",
      })
    );

    navigate("/payment-pending");
    setMessage("Bank transfer submitted. Verification may take up to 24 hours.");
    setMessageType("warning");

  };

  return (
    <div className="container pb-5">
      <h2>Payment</h2>
      <p>Plan: {data.plan.name}</p>
      <p><strong>Amount:</strong> ₹{total}</p>
      {message && (
        <div className={`alert alert-${messageType} mt-3`}>
          {message}
        </div>
      )}

      {/* RAZORPAY */}
      <button className="btn btn-primary mb-3" onClick={handlePayment}>
        Pay Now (Razorpay)
      </button>

      <hr />

      {/* QR PAYMENT */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => {
          setShowQR(!showQR);
          setShowBank(false);
          setMessage("");
        }}

      >
        Pay via QR Code
      </button>

      {showQR && (
        <div className="card p-3">
          <p><strong>Scan QR & Complete Payment</strong></p>

          <img
            src={qrCode}
            alt="UPI QR Code" className="mx-auto d-block"
            style={{ maxWidth: "220px" }}
          />

          <input
            className="form-control mt-3"
            placeholder="Enter UPI / Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />

          <button className="btn btn-success mt-3" onClick={handleQRSubmit}>
            Submit Payment
          </button>

          <small className="text-muted d-block mt-2">
            * QR payments are verified manually and may take up to 24 hours.
          </small>
        </div>
      )}
      <hr />

      <button
        className="btn btn-outline-dark mb-3"
        onClick={() => {
          setShowBank(!showBank);
          setShowQR(false);
          setMessage("");
        }}>
        Pay via NEFT / Bank Transfer
      </button>



      {showBank && (
        <div className="card p-3">
          <h6 className="mb-2">Company Bank Details</h6>

          <ul className="list-unstyled mb-3">
            <li><strong>Bank Name:</strong> ICICI Bank</li>
            <li><strong>Account No:</strong> 071505002065</li>
            <li><strong>Branch:</strong> New Rohtak Road, Karol Bagh</li>
            <li><strong>IFSC Code:</strong> ICIC0000715</li>
          </ul>

          <input
            className="form-control mb-2"
            placeholder="Enter NEFT / Reference Number"
            value={neftTxnId}
            onChange={(e) => setNeftTxnId(e.target.value)}
          />

          <button className="btn btn-success" onClick={handleNeftSubmit}>
            Submit Bank Transfer
          </button>

          <small className="text-muted d-block mt-2">
            * NEFT payments are verified manually within 24 hours.
          </small>
        </div>
      )}

    </div>
  );
};

export default Payment;
