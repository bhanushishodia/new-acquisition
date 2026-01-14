import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";


const GetStartedForm = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));

  if (!data) {
    return <p className="text-center mt-5">Please select a plan first</p>;
  }

  const [formData, setFormData] = useState({
    legalName: "",
    businessEmail: "",
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
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [showAgreement, setShowAgreement] = useState(false);


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

      !formData.company ||
      !formData.website ||
      !formData.purpose
    ) {
      return setError("Please fill all required fields.");
    }

    if (!phone || phone.length < 8) {
      return setError("Please enter a valid mobile number.");
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



    localStorage.setItem(
      "purchaseData",
      JSON.stringify({
        ...data,
        user: {
          ...formData,
          mobile: `+${phone}`,
          country,
        },
      })
    );



    navigate("/terms-conditions");
  };

  return (
    <div className="container pb-5">
      <h2>Company Verification Details</h2>

      <p className="mb-4">
        Selected Plan: <strong>{data.plan?.name}</strong>
      </p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="legalName"
          placeholder="Full Legal Name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="businessEmail"
          placeholder="Business Email (company domain)"
          onChange={handleChange}
        />




        <div className="mb-3">


          <PhoneInput
            country="in"
            value={phone}
            onChange={(value, countryData) => {
              setPhone(value);
              setCountry(countryData.countryCode);
            }}
            enableSearch
            countryCodeEditable={false}
            containerClass="w-100"
            inputStyle={{
              width: "100%",
              height: "38px",
            }}
            buttonStyle={{
              border: "1px solid #ced4da",
            }}
          />
        </div>


        <input
          className="form-control mb-3"
          name="company"
          placeholder="Company Name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
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
          className="form-control mb-3"
          name="gst"
          placeholder="GST Number"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
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
          <label className="form-label h6">Upload Company Legal Documents</label>
          <input
            type="file"
            className="form-control"
            name="document"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary w-50">
          Continue to Order Summary
        </button>
      </form>
    </div>
  );
};

export default GetStartedForm;
