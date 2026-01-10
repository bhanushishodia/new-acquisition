import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADDONS = [
  { id: "chatbot", name: "Advanced Chatbot", price: 5000 },
  { id: "crm", name: "CRM Integration", price: 3000 },
  { id: "otp", name: "OTP System", price: 2000 },
];

const AddOns = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));
  const [selected, setSelected] = useState([]);

  if (!data) return <p>Select plan first</p>;

  const toggleAddon = (addon) => {
    setSelected((prev) =>
      prev.find((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const proceed = () => {
    localStorage.setItem(
      "purchaseData",
      JSON.stringify({ ...data, addons: selected })
    );
    navigate("/coupon");
  };

  return (
    <div className="container py-5">
      <h2>Add-ons & Integrations</h2>

      {ADDONS.map((a) => (
        <div key={a.id} className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            onChange={() => toggleAddon(a)}
          />
          <label className="form-check-label">
            {a.name} – ₹{a.price}
          </label>
        </div>
      ))}

      <button className="btn btn-primary mt-3" onClick={proceed}>
        Proceed
      </button>
    </div>
  );
};

export default AddOns;
