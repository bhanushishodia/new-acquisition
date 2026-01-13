import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="container py-5 text-center">
      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 500 }}>
        <h3 className="text-success mb-3">Payment Successful 🎉</h3>

        <p>
          Your payment has been successfully verified by our accounts team.
        </p>

        <p className="text-muted">
          Our onboarding team will contact you shortly.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
