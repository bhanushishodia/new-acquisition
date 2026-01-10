import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetStartedForm = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));

  if (!data) {
    return <p className="text-center mt-5">Please select a plan first</p>;
  }




  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    purpose: "",
  });

  const [accepted, setAccepted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accepted) return alert("Accept T&C");

    localStorage.setItem(
      "purchaseData",
      JSON.stringify({
        ...data,
        user: formData,
      })
    );

    navigate("/order-summary");
  };


  return (
    <div className="container py-5">
      <h2>Step 2: Company Details</h2>

      <p>
        Selected Plan:
        <strong> {data.plan.name} ({data.plan.billing})</strong>
      </p>


      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} />
        <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
        <input className="form-control mb-2" name="mobile" placeholder="Mobile" onChange={handleChange} />
        <input className="form-control mb-2" name="company" placeholder="Company" onChange={handleChange} />
        <select className="form-control mb-2" name="purpose" onChange={handleChange}>
          <option value="">Purpose</option>
          <option value="marketing">Marketing</option>
          <option value="support">Support</option>
        </select>

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" onChange={() => setAccepted(!accepted)} />
          <label className="form-check-label">Accept Terms</label>
        </div>

        <button className="btn btn-primary">Next</button>
      </form>
    </div>
  );
};

export default GetStartedForm;
