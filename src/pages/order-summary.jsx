import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));

  if (!data || !data.user) {
    return <p className="text-center mt-5">No order data found</p>;
  }

  const addonsTotal = data.addons.reduce((s, a) => s + a.price, 0);
  const discount = data.coupon?.discount || 0;
  const total = data.plan.price + addonsTotal - discount;


  return (
    <div className="container py-5">
      <h2>Order Summary</h2>

      <h5>Plan</h5>
      <p>{data.plan.name} ({data.plan.billing})</p>

      <h5>User Details</h5>
      <ul>
        {data.addons.map(a => (
          <li key={a.id}>{a.name} – ₹{a.price}</li>
        ))}
      </ul>

      <h5>Discount</h5>
      <p>₹{discount}</p>

      <h4>Total Payable: ₹{total}</h4>

      <button className="btn btn-success" onClick={() => navigate("/payment")}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderSummary;
