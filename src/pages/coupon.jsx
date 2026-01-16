import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const COUPONS = {
  NEWYEAR10: { type: "percent", value: 10 },
  FLAT2000: { type: "flat", value: 2000 },
  NOSETUP: { type: "nosetup" }, // 👈 new offer
};

const Coupon = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("purchaseData"));

useEffect(() => {
  if (data?.coupon) {
    setCode(data.coupon.code || "");
    setDiscount(data.coupon.discount || 0);
    setSetupFeeWaived(!!data.coupon.setupFeeWaived);
  }
}, [data]);



  if (!data) return <p>No purchase data found</p>;
  const [code, setCode] = useState("");   // ✅ MISSING STATE

  const [discount, setDiscount] = useState(0);
  const [setupFeeWaived, setSetupFeeWaived] = useState(false);

  const basePrice = data.plan.price;
  const addonsTotal = data.addonsTotal || 0;
  const setupFee = data.setupFee || 0;

  const totalBeforeDiscount = basePrice + addonsTotal + setupFee;
  const effectiveSetupFee = setupFeeWaived ? 0 : setupFee;

  const totalAfterDiscount =
    basePrice + addonsTotal + effectiveSetupFee - discount;




  const applyCoupon = () => {
    const c = COUPONS[code.toUpperCase()];
    if (!c) return alert("Invalid coupon");

    let discountAmount = 0;
    let waived = false;

    if (c.type === "percent") {
      discountAmount = Math.round((basePrice * c.value) / 100);
    }

    if (c.type === "flat") {
      discountAmount = Math.min(c.value, basePrice);
    }

    if (c.type === "nosetup") {
      waived = true;
    }

    localStorage.setItem(
      "purchaseData",
      JSON.stringify({
        ...data,
        coupon: {
          code: code.toUpperCase(),
          discount: discountAmount,
          setupFeeWaived: waived,
        },
      })
    );

    setDiscount(discountAmount);
    setSetupFeeWaived(waived);
  };




  return (
    <div className="container pb-5">
      <h2 className="mb-3">Apply Coupon</h2>

      <input
        className="form-control mb-2"
        placeholder="Enter coupon code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button className="btn btn-secondary mb-3" onClick={applyCoupon}>
        Apply
      </button>

      <div className="card p-3 shadow-sm">
        <p>Base Plan: ₹{basePrice}</p>
        <p>Add-ons: ₹{addonsTotal}</p>

        <p>
          Setup Fee: ₹
          {setupFeeWaived ? (
            <span className="text-success text-decoration-line-through">
              {setupFee} (Waived)
            </span>
          ) : (
            setupFee
          )}
        </p>

        <p>Discount: ₹{discount}</p>
        <hr />
        <h5>Total Payable: ₹{totalAfterDiscount}</h5>

      </div>

      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/get-started")}
      >
        Continue
      </button>
    </div>
  );
};

export default Coupon;
