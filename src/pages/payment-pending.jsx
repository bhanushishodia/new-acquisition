import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPending = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    // 🔁 Polling simulation (replace with API later)
    const interval = setInterval(() => {
      const paymentStatus = localStorage.getItem("paymentStatus");
      if (paymentStatus === "success") {
        setStatus("success");
        navigate("/payment-success");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="container py-5 text-center">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 500 }}>
        <h3 className="mb-3">Payment Verification Pending</h3>

        <p className="text-muted">
          Thank you for your payment.  
          Our accounts team is currently verifying the transaction.
        </p>

   

        <p className="small text-muted">
          This usually takes a few hours.  
        
        </p>
      </div>
    </div>
  );
};

export default PaymentPending;
