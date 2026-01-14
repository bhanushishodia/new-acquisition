import React, { useState, useMemo } from "react";
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
  { id: "api", name: "APIs or Webhooks Access" },
  { id: "multi", name: "Multi Templates Campaign" },
];

/* ===== PAID FEATURES ===== */
const PAID_FEATURES = [
  { id: "meta", name: "META - Blue Tick Verification", oneTime: 3000 },
  { id: "agent", name: "Additional Agent / Sub-login", monthly: 699, yearly: 5999 },
  { id: "channel", name: "Add-on Channel (Unlimited Conversation)", monthly: 499, yearly: 1999 },
  { id: "reports", name: "Multi Channel - Click & Engage Reports", monthly: 1499 },
  { id: "lead", name: "Integrated Lead & Directory Management", monthly: 1500 },
  { id: "dedicated", name: "Dedicated Person for Reporting & Analysis", monthly: 1500 },
  { id: "fallback", name: "Multi-channel Fall Back Setup (SMS/RCS)", yearly: 5000 },
  { id: "otp", name: "OTP System Setup", yearly: 4000 },
  { id: "chatbot-adv", name: "Advanced Chatbot (Up to 500 nodes)", yearly: 6999 },
];

const AddOns = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));

  const [freeSelected, setFreeSelected] = useState([]);
  const [paidSelected, setPaidSelected] = useState([]);
  const [showFreeLimitMsg, setShowFreeLimitMsg] = useState(false);


  if (!data) return <p>Please select a plan first</p>;

  /* ===== FREE ADDONS (MAX 5 LOGIC) ===== */
  const toggleFreeAddon = (addon) => {
    const exists = freeSelected.find((a) => a.id === addon.id);

    if (!exists && freeSelected.length >= 5) {
      setShowFreeLimitMsg(true);
      return;
    }

    setShowFreeLimitMsg(false);

    setFreeSelected((prev) =>
      exists ? prev.filter((a) => a.id !== addon.id) : [...prev, addon]
    );
  };


  /* ===== PAID FEATURES ===== */
  const togglePaidAddon = (addon) => {
    const exists = paidSelected.find((a) => a.id === addon.id);
    setPaidSelected((prev) =>
      exists ? prev.filter((a) => a.id !== addon.id) : [...prev, addon]
    );
  };

  const getPrice = (a) => a.monthly || a.yearly || a.oneTime || 0;

  const paidTotal = useMemo(
    () => paidSelected.reduce((sum, a) => sum + getPrice(a), 0),
    [paidSelected]
  );


  const grandTotal = data.plan.price + paidTotal + data.setupFee;

  const proceed = () => {
    const paidTotal = paidSelected.reduce(
      (s, a) => s + (a.monthly || a.yearly || a.oneTime || 0),
      0
    );

    localStorage.setItem(
      "purchaseData",
      JSON.stringify({
        ...data,
        addons: paidSelected.map(a => ({
          id: a.id,
          name: a.name,
          price: a.monthly || a.yearly || a.oneTime || 0,
        })),
        addonsTotal: paidTotal,
        freeAddons: freeSelected,
      })
    );
    

    navigate("/coupon");
  };


  return (
    <div className="container pb-5">
      <h2 className="mb-3">Customizable Add-Ons</h2>
      <p className="text-muted mb-4">
        To make Anantya work perfectly for your business needs
      </p>

      {/* ================= FREE ADDONS ================= */}
      <div className="card p-4 mb-5 shadow-sm">
        <h5 className="mb-3">Free Add-ons (Select up to 5)</h5>
        {/* LIMIT MESSAGE */}
        {showFreeLimitMsg && (
          <div className="alert alert-warning py-2 mb-3">
            <strong>⚠ Limit Reached:</strong> You can select up to <b>5 add-ons for free</b>.
            Additional selections will be <b>chargeable</b>.
          </div>
        )}
        <div className="row">
          {FREE_ADDONS.map((a) => (
            <div key={a.id} className="col-md-6 mb-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={freeSelected.some((s) => s.id === a.id)}
                  onChange={() => toggleFreeAddon(a)}
                />
                <label className="form-check-label">{a.name}</label>
              </div>
            </div>
          ))}
        </div>

        <small className="text-muted">
          Selected: {freeSelected.length} / 5
        </small>
      </div>

      {/* ================= PAID FEATURES ================= */}
      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">Paid Features & Integrations</h5>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Select</th>
                <th>Feature</th>
                <th>One-Time (₹)</th>
                <th>Monthly (₹)</th>
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
                  <td>{a.name}</td>
                  <td>{a.oneTime || "-"}</td>
                  <td>{a.monthly || "-"}</td>
                  <td>{a.yearly || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="card p-4 shadow-sm mb-4">
        <h5>Price Summary</h5>
        <p>Base Plan: ₹{data.plan.price}</p>
        <p>Setup Fee: ₹{data.setupFee}</p>
        <p>Paid Add-ons: ₹{paidTotal}</p>
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
