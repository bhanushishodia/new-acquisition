import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const COUPONS = {
  NEWYEAR10: { type: "percent", value: 10 },
  FLAT2000: { type: "flat", value: 2000 },
};

const Coupon = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const total =
    data.plan.price +
    data.addons.reduce((sum, a) => sum + a.price, 0);

  const applyCoupon = () => {
    const c = COUPONS[code];
    if (!c) return alert("Invalid coupon");

    const d =
      c.type === "percent"
        ? Math.round((total * c.value) / 100)
        : c.value;

    setDiscount(d);

    localStorage.setItem(
      "purchaseData",
      JSON.stringify({
        ...data,
        coupon: { code, discount: d },
      })
    );
  };

  return (
    <div className="container py-5">
      <h2>Apply Coupon</h2>

      <input
        className="form-control mb-2"
        placeholder="Enter coupon code"
        onChange={(e) => setCode(e.target.value)}
      />

      <button className="btn btn-secondary" onClick={applyCoupon}>
        Apply
      </button>

      <p className="mt-3">Total: ₹{total}</p>
      <p>Discount: ₹{discount}</p>
      <p><strong>Payable: ₹{total - discount}</strong></p>

      <button className="btn btn-primary" onClick={() => navigate("/get-started")}>
        Continue
      </button>
    </div>
  );
};

export default Coupon;
