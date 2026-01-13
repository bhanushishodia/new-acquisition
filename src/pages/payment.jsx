import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qrCode from "../assets/qr.jpeg"; // path adjust karo
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const Payment = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));
  const [showQR, setShowQR] = useState(false);
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
            alert("Payment done but verification failed");
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
        alert(response.error.description);
      });

      rzp.open();
    } catch (err) {
      console.error("PAYMENT ERROR 👉", err);
      alert("Payment failed");
    }
  };


  const handleQRSubmit = () => {
    if (!txnId) {
      alert("Please enter UPI / Transaction ID");
      return;
    }

    localStorage.setItem(
      "qrPayment",
      JSON.stringify({
        txnId,
        amount: total,
        purchaseData: data,
        status: "PENDING",
      })
    );

    navigate("/payment-pending");
  };

  return (
    <div className="container py-5">
      <h2>Payment</h2>
      <p>Plan: {data.plan.name}</p>
      <p><strong>Amount:</strong> ₹{total}</p>

      {/* RAZORPAY */}
      <button className="btn btn-primary mb-3" onClick={handlePayment}>
        Pay Now (Razorpay)
      </button>

      <hr />

      {/* QR PAYMENT */}
      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() => setShowQR(!showQR)}
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
    </div>
  );
};

export default Payment;
