import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/* ===== FREE ADDONS (MAX 5) ===== */
const FREE_ADDONS = [
  { id: "admin", name: "1 Admin + 5 Sub Logins" },
  { id: "audience", name: "Smart Audience Segmentation" },
  { id: "scheduler", name: "Campaign Scheduler" },
  { id: "routing", name: "Smart Agent Routing" },
  { id: "tracking", name: "Campaign Click Tracking" },
  { id: "roundrobin", name: "Round-Robin Chat Assignment" },
  { id: "rules", name: "Custom Agent Rules" },
  { id: "chatbot", name: "Multi-Node Chatbot" },
  { id: "cart", name: "Cart & Catalogue Support" },
  { id: "support", name: "Customer Support (Email, Chat & Call)" },
  { id: "flow", name: "Unlimited WhatsApp Flows" },
  { id: "api_access", name: "APIs or Webhooks Access" },
  { id: "multi", name: "Multi Templates Campaign" },
];

const EXTRA_FREE_PRICE = 2000;
const API_PRICE = 4000;
/* ===== PAID FEATURES ===== */
const PAID_FEATURES = [
  {
    id: "meta",
    name: "META - Blue Tick Verification",
    oneTime: 3000,
  },
  {
    id: "agent",
    name: "Additional Agent / Sub-login (per agent)",
    quarterly: 2100,
    yearly: 6000,
  },
  {
    id: "channel",
    name: "Add-on Channel (Unlimited Conversation) (Per Channel)",
    quarterly: 1500,
    yearly: 2000,
  },
  {
    id: "reports",
    name: "Multi Channel - Click & Engage Reports",
    quarterly: 2000,
    yearly: 4500,
  },
  {
    id: "lead",
    name: "Integrated Lead Management System & Directory Management",
    quarterly: 5000,
    yearly: 15000,
  },
  {
    id: "dedicated",
    name: "Dedicated Person for Reporting & Analysis",
    quarterly: 4500,
    yearly: 15000,
  },
  {
    id: "onprem",
    name: "On-Premises Database Hosting",
  },
  {
    id: "fallback",
    name: "Multi-channel Fall Back Setup (SMS/RCS) (Per Channel)",
    yearly: 5000,
  },
  {
    id: "api_integration",
    name: "API Integration",
    note: "Based on scope of work",
  },
  {
    id: "otp",
    name: "OTP System Setup",
    yearly: 10000,
  },
  {
    id: "chatbot-adv",
    name: "Advanced Chatbot (Up to 500 nodes)",
    yearly: 6999,
  },
];

const AddOns = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));

  if (!data) return <p>Please select a plan first</p>;

  const isNeoPro = data.plan?.name === "Neo Pro";

  const [freeSelected, setFreeSelected] = useState([]);
  const [paidSelected, setPaidSelected] = useState([]);
  const [billingCycle, setBillingCycle] = useState("quarterly");

  /* ===== AUTO SELECT ALL FOR NEO PRO ===== */
  useEffect(() => {
    if (isNeoPro) {
      setFreeSelected(FREE_ADDONS);
    }
  }, [isNeoPro]);

  /* ===== FREE ADDON TOGGLE ===== */
  const toggleFreeAddon = (addon) => {
    if (isNeoPro) return;

    const exists = freeSelected.some(a => a.id === addon.id);

    setFreeSelected(prev =>
      exists ? prev.filter(a => a.id !== addon.id) : [...prev, addon]
    );
  };

  /* ===== PAID ADDON TOGGLE ===== */
  const togglePaidAddon = (addon) => {
    const exists = paidSelected.some(a => a.id === addon.id);
    setPaidSelected(prev =>
      exists ? prev.filter(a => a.id !== addon.id) : [...prev, addon]
    );
  };

  const getPrice = (a) => {
    if (a.oneTime) return a.oneTime;
    return billingCycle === "yearly" ? a.yearly || 0 : a.quarterly || 0;
  };

  const paidTotal = useMemo(
    () => paidSelected.reduce((sum, a) => sum + getPrice(a), 0),
    [paidSelected, billingCycle]
  );

  /* ===== FREE ADDON COST LOGIC ===== */
  const freeLimit = 5;
  const nonApiFreeSelected = freeSelected.filter(
    (a) => a.id !== "api_access"
  );

  const extraFreeCount = isNeoPro
    ? 0
    : Math.max(0, nonApiFreeSelected.length - freeLimit);

  const extraFreeTotal = extraFreeCount * EXTRA_FREE_PRICE;



  const apiSelected = freeSelected.some(a => a.id === "api_access");
  const apiCharge = !isNeoPro && apiSelected ? API_PRICE : 0;

  const addonsTotal = paidTotal + extraFreeTotal + apiCharge;
  const grandTotal = data.plan.price + data.setupFee + addonsTotal;

  const proceed = () => {
    localStorage.setItem(
      "purchaseData",
      JSON.stringify({
        ...data,
        freeAddons: freeSelected,
        paidAddons: paidSelected,
        addonsTotal,
        grandTotal,
      })
    );
    navigate("/coupon");
  };


  return (
    <div className="container pb-5">
      <h4 className="mb-2">
        {isNeoPro ? "Neo Pro Plan Active" : "Standard Plan Add-ons"}
      </h4>
      <p className="text-muted">
        {isNeoPro
          ? "Unlimited Free Add-ons enabled"
          : `Selected ${freeSelected.length}/5 free add-ons`}
      </p>

      <p className="text-muted mb-4">
        To make Anantya work perfectly for your business needs
      </p>
      <p className="text-muted">
        {isNeoPro
          ? "Neo Pro → Unlimited Free Add-ons Enabled"
          : "Non-Neo Pro → 5 Free Add-ons, extra ₹2,000 each"}
      </p>

      {/* ================= FREE ADDONS ================= */}
      <div className="card p-4 mb-5 shadow-sm">
        <div className={`alert ${isNeoPro ? "alert-success" : "alert-info"}`}>
          {isNeoPro ? (
            <strong>✅ Neo Pro Plan:</strong>
          ) : (
            <strong>ℹ Free Add-ons Policy:</strong>
          )}
          <span className="ms-2">
            {isNeoPro
              ? "Unlimited Free Add-ons Enabled"
              : "First 5 add-ons free, then ₹2,000 per add-on. API Access ₹4,000"}
          </span>
        </div>

        <h2 className="mb-3">Customizable Add-Ons</h2>

        {/* ===== FREE ADDONS ===== */}
        <div className="card p-4 shadow-sm mb-4">
          <h5 className="mb-3">Free Add-ons</h5>


          <div className="row">
            {FREE_ADDONS.map(a => (
              <div className="col-md-6 mb-2" key={a.id}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={freeSelected.some(s => s.id === a.id)}
                    disabled={isNeoPro}
                    onChange={() => toggleFreeAddon(a)}
                  />
                  <label className="form-check-label">{a.name}
                    {a.id === "api_access" && (
                      <span className="badge bg-warning ms-2">
                        ₹4,000 (One-time)
                      </span>
                    )}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <small className="text-muted">
            Selected: {freeSelected.length}
            {!isNeoPro && " / 5 free"}
          </small>
          {!isNeoPro && (
            <small className="text-danger">
              Extra Add-ons (excluding API): {extraFreeCount} × ₹2,000 = ₹{extraFreeTotal}


              {apiSelected && <div>API Access: ₹4,000</div>}
            </small>
          )}
        </div>

      </div>

      {/* ================= PAID FEATURES ================= */}
      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">Paid Features & Integrations</h5>
        <div className="mb-3">
          <button
            className={`btn btn-sm me-2 ${billingCycle === "quarterly" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setBillingCycle("quarterly")}
          >
            Quarterly
          </button>
          <button
            className={`btn btn-sm ${billingCycle === "yearly" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setBillingCycle("yearly")}
          >
            Annually
          </button>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Select</th>
                <th>Feature</th>
                <th>One-Time (₹)</th>
                <th>Quarterly (₹)</th>
                <th>Annually (₹)</th>

              </tr>
            </thead>
            <tbody>
              {PAID_FEATURES.map((a) => (
                <tr key={a.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={paidSelected.some((s) => s.id === a.id)}
                      onChange={() => togglePaidAddon(a)}
                    />
                  </td>
                  <td>{a.name}
                    {a.note && <div className="text-muted small">{a.note}</div>}
                  </td>


                  <td>{a.oneTime || "-"}</td>
                  <td>{a.quarterly || "-"}</td>
                  <td>{a.yearly || "-"}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= CONVERSATION PRICING ================= */}
      <div className="card p-4 shadow-sm my-4">
        <h5 className="mb-3">WhatsApp Conversation Pricing</h5>

        <div className="row g-3">
          <div className="col-md-3">
            <div className="border rounded p-3 h-100 text-center">
              <h6 className="mb-1">Marketing</h6>
              <h4 className="text-primary mb-0">₹0.95</h4>
              <small className="text-muted">per conversation</small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="border rounded p-3 h-100 text-center">
              <h6 className="mb-1">Utility</h6>
              <h4 className="text-success mb-0">₹0.15</h4>
              <small className="text-muted">per conversation</small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="border rounded p-3 h-100 text-center">
              <h6 className="mb-1">Authentication</h6>
              <h4 className="text-warning mb-0">₹0.15</h4>
              <small className="text-muted">per conversation</small>
            </div>
          </div>

          <div className="col-md-3">
            <div className="border rounded p-3 h-100 text-center bg-light">
              <h6 className="mb-1">Service</h6>
              <h4 className="text-success mb-0">Free</h4>
              <small className="text-muted">unlimited</small>
            </div>
          </div>
        </div>

        <div className="alert alert-info mt-4 mb-0 small">
          💡 <strong>Note:</strong> WhatsApp conversation charges are applied as per Meta's latest pricing
          and may vary based on country and use-case category.
        </div>
      </div>


      {/* ================= SUMMARY ================= */}
      <div className="card p-4 shadow-sm mb-4">
        <h5>Price Summary</h5>
        <p>Base Plan: ₹{data.plan.price}</p>
        <p>Setup Fee: ₹{data.setupFee}</p>
        <p>Paid Add-ons: ₹{paidTotal}</p>
        {extraFreeTotal > 0 && <p>Extra Free Add-ons: ₹{extraFreeTotal}</p>}
        {apiCharge > 0 && <p>API/Webhook Access: ₹{apiCharge}</p>}


        <hr />
        <h5>Total Payable: ₹{grandTotal}</h5>
      </div>


      <button className="btn btn-primary" onClick={proceed}>
        Proceed to Coupon
      </button>
    </div>
  );
};

export default AddOns;
