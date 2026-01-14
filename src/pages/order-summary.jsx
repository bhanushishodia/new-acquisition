import React from "react";
import { useNavigate } from "react-router-dom";
import usePurchaseGuard from "../hooks/usePurchaseGuard";

const OrderSummary = () => {
    usePurchaseGuard();
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));

  if (!data || !data.user) {
    return <p className="text-center mt-5">No order data found</p>;
  }

  const basePrice = data.plan.price;
  const addonsTotal = data.addonsTotal || 0;
  const setupFee = data.coupon?.setupFeeWaived ? 0 : data.setupFee;
  const discount = data.coupon?.discount || 0;

  const total = basePrice + addonsTotal + setupFee - discount;
  return (
    <div className="container pb-5">
      <h2>Order Summary</h2>

      <h5>Plan</h5>
      <p>
        {data.plan.name} ({data.plan.billing}) – ₹{basePrice}
      </p>

      <h5>Setup Fee</h5>
      <p>
        ₹{data.setupFee}
        {data.coupon?.setupFeeWaived && (
          <span className="text-success ms-2">(Waived)</span>
        )}
      </p>

      <h5>Paid Add-ons</h5>
      {data.addons.length === 0 ? (
        <p>None</p>
      ) : (
        <ul>
          {data.addons.map(a => (
            <li key={a.id}>
              {a.name} – ₹{a.price}
            </li>
          ))}
        </ul>
      )}

      <h5>Discount</h5>
      <p>₹{discount}</p>

      <hr />

      <h4>Total Payable: ₹{total}</h4>


      <button className="btn btn-success mt-3" onClick={() => navigate("/payment")}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderSummary;
