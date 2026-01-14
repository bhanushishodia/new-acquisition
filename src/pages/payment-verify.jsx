import React from "react";

const PaymentVerify = () => {
    const markSuccess = () => {
        localStorage.setItem("paymentStatus", "success");
        alert("Payment marked as SUCCESS");
    };

    return (
        <div className="container py-5">
            <h2>Payment Verification (Accounts)</h2>

            <div className="card p-4 shadow-sm">
                <p><strong>Customer:</strong> From purchaseData</p>
                <p><strong>Amount:</strong> ₹XXXX</p>
                <p><strong>Mode:</strong> Bank Transfer / UPI</p>

                <button className="btn btn-success" onClick={markSuccess}>
                    ✅ Mark Payment as Received
                </button>
            </div>
        </div>
    );
};

export default PaymentVerify;
