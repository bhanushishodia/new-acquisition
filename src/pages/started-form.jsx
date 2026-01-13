import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GetStartedForm = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));

  if (!data) {
    return <p className="text-center mt-5">Please select a plan first</p>;
  }

  const [formData, setFormData] = useState({
    legalName: "",
    businessEmail: "",
    mobile: "",
    company: "",
    website: "",
    purpose: "",
    gst: "",
    udyam: "",
    companyReg: "",
    document: null,
  });

  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "mobile") {
      const onlyDigits = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        mobile: onlyDigits,
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const isBusinessEmail = (email) =>
    !/@(gmail|yahoo|outlook|hotmail)\.com$/i.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.legalName ||
      !formData.businessEmail ||
      !formData.mobile ||
      !formData.company ||
      !formData.website ||
      !formData.purpose
    ) {
      return setError("Please fill all required fields.");
    }
    if (formData.mobile.length !== 10) {
      return setError("Please enter a valid 10-digit mobile number.");
    }


    if (!isBusinessEmail(formData.businessEmail)) {
      return setError("Please enter a valid business email address.");
    }

    if (!formData.gst && !formData.udyam && !formData.companyReg) {
      return setError(
        "Please provide at least one: GST Number, Udyam Registration, or Company Registration Number."
      );
    }

    if (!formData.document) {
      return setError("Please upload company legal documents.");
    }

    if (!accepted) {
      return setError("Please accept the Terms & Conditions.");
    }

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
      <h2>Company Verification Details</h2>

      <p className="mb-4">
        Selected Plan: <strong>{data.plan?.name}</strong>
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="legalName"
          placeholder="Full Legal Name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="businessEmail"
          placeholder="Business Email (company domain)"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          maxLength={12}
          inputMode="numeric"
          onChange={handleChange}
        />


        <input
          className="form-control mb-2"
          name="company"
          placeholder="Company Name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="website"
          placeholder="Company Website (https://)"
          onChange={handleChange}
        />

        <select
          className="form-control mb-3"
          name="purpose"
          onChange={handleChange}
        >
          <option value="">Select Purpose</option>
          <option value="marketing">Marketing</option>
          <option value="support">Customer Support</option>
          <option value="sales">Sales</option>
        </select>

        <h6>Business Registration (Any one required)</h6>

        <input
          className="form-control mb-2"
          name="gst"
          placeholder="GST Number"
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="udyam"
          placeholder="Udyam Registration Number"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="companyReg"
          placeholder="Company Registration Number"
          onChange={handleChange}
        />

        <div className="mb-3">
          <label className="form-label">Upload Company Legal Documents</label>
          <input
            type="file"
            className="form-control"
            name="document"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={accepted}
            onChange={() => setAccepted(!accepted)}
          />
          <label className="form-check-label">
            I agree to the Terms & Conditions
          </label>
        </div>

        <button className="btn btn-primary w-50">
          Continue to Order Summary
        </button>
      </form>
    </div>
  );
};

export default GetStartedForm;
