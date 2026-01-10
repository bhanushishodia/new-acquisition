import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnantyaPlatformPricing = () => {
  const navigate = useNavigate();
  const [billingType, setBillingType] = useState("monthly");

  const pricingPlans = {
    monthly: [
      {
        name: "Neo",
        price: 1,
        features: ["Unlimited Service Conversations", "Ultimate Templates Approval &Sessions", "Campaign Messaging", "Welcome & Away Messages", "Quick Replies", "Basic & Carousel Message Formats", "Unlimited Smart Labeling", "+ Any 5 Customizable Add-ons"],
      },
      {
        name: "Neo Pro",
        price: 24999,
        popular: true,
        features: ["All core features of Anantya Neo+", "Social Media Integrations (Facebook, Instagram)", "Lead Management System", "Priority Support", "Keyword Alert", "+ All customizable add-ons"],
      },
      {
        name: "Neo Elite",
        custom: true,
        features: ["All features of Anantya Neo Pro", "Industry-Specific WhatsApp Account Setup", "RCS - SMS Fallback Setup", "2 Basic Industry-Specific Integrations (CRM, ERP, or HR tools depending on industry)", "Advance Chatbot", "Dedicated Account Manager & Consultation", "Retrospective Smart Agent Routing", "OTP Generation System", "Custom Message Pricing"],
      },
    ],
    yearly: [
      {
        name: "Neo",
        price: 9999,
        features: ["Unlimited Service Conversations", "Ultimate Templates Approval &Sessions", "Campaign Messaging", "Welcome & Away Messages", "Quick Replies", "Basic & Carousel Message Formats", "Unlimited Smart Labeling", "+ Any 5 Customizable Add-ons"],
      },
      {
        name: "Neo Pro",
        price: 19999,
        features: ["All core features of Anantya Neo +", "Social Media Integrations (Facebook, Instagram)", "Lead Management System", "Priority Support", "Keyword Alert", "+ All customizable add-ons"],
      },
      {
        name: "Neo Elite",
        price: 37999,
        popular: true,
        custom: true,
        features: ["All features of Anantya Neo Pro", "Industry-Specific WhatsApp Account Setup", "RCS - SMS Fallback Setup", "2 Basic Industry-Specific Integrations (CRM, ERP, or HR tools depending on industry)", "Advance Chatbot", "Dedicated Account Manager & Consultation", "Retrospective Smart Agent Routing", "OTP Generation System", "Custom Message Pricing"],
      },
    ],
  };

const handleBuyNow = (plan) => {
  if (plan.custom) {
    window.open("https://wa.link/0wphve", "_blank");
    return;
  }

  const payload = {
    plan: {
      name: plan.name,
      billing: billingType,
      price: plan.price,
    },
    addons: [],
    coupon: null,
  };

  localStorage.setItem("purchaseData", JSON.stringify(payload));
  navigate("/add-ons");
};


  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Anantya Pricing</h2>

      <div className="text-center mb-4">
        <label className="me-3">
          <input
            type="radio"
            checked={billingType === "monthly"}
            onChange={() => setBillingType("monthly")}
          /> Monthly
        </label>
        <label>
          <input
            type="radio"
            checked={billingType === "yearly"}
            onChange={() => setBillingType("yearly")}
          /> Yearly
        </label>
      </div>

      <div className="row">
        {pricingPlans[billingType].map((plan, i) => (
          <div className="col-md-4" key={i}>
            <div className="card h-100">
              <div className="card-body">
                {plan.popular && <span className="badge bg-primary">Popular</span>}
                <h5>{plan.name}</h5>
                {plan.custom ? (
                  <p>Custom Pricing</p>
                ) : (
                  <p>₹{plan.price}</p>
                )}
                <ul>
                  {plan.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
                <button
                  className="btn btn-primary"
                  onClick={() => handleBuyNow(plan)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnantyaPlatformPricing;
