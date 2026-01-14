import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import agreementPdf from "../assets/pdf/Anantya-Short-Agreement-2025.pdf";
const TermsAndConditions = () => {
  const navigate = useNavigate();
  const [showAgreement, setShowAgreement] = useState(false);

  const data = JSON.parse(localStorage.getItem("purchaseData"));
  const user = data?.user;
const [agreed, setAgreed] = useState(false);


    if (!user) {
        return <p className="text-center mt-5">No agreement data found</p>;
    }

    return (
        <div className="container py-4">
            <div
                className="mx-auto p-4 border rounded"
                style={{ maxWidth: "900px", background: "#fff" }}
            >
                <h4 className="text-center mb-4">
                    Anantya Short Agreement – 2026
                </h4>

                <p>
                    This Agreement is entered into between <strong>Anantya.ai</strong> and
                    <strong> {user.company}</strong>.
                </p>

                <p>
                    <strong>Business Email:</strong> {user.businessEmail}
                </p>

                <p>
                    <strong>Mobile:</strong> {user.mobile}
                </p>

                {user.gst && (
                    <p>
                        <strong>GST Number:</strong> {user.gst}
                    </p>
                )}

                {user.udyam && (
                    <p>
                        <strong>Udyam Registration:</strong> {user.udyam}
                    </p>
                )}

                {user.companyReg && (
                    <p>
                        <strong>Company Registration No:</strong> {user.companyReg}
                    </p>
                )}

                <hr />

                <p>
                    This agreement governs the use of Anantya platform services and
                    confirms that the above details are correct and verified.
                </p>

                <div className="text-center mt-4">
                    <button
                        className="btn btn-secondary me-2"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
               <div className="form-check mt-3">
<input
  className="form-check-input"
  type="checkbox"
  id="agreeCheck"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>

  <label className="form-check-label" htmlFor="agreeCheck">
    I agree to the{" "}
    <span
      className="text-primary text-decoration-underline"
      style={{ cursor: "pointer" }}
      onClick={() => setShowAgreement(true)}
    >
      Terms & Conditions
    </span>
  </label>
</div>


                 <button
  className="btn btn-primary mt-3"
  disabled={!agreed}
  onClick={() => navigate("/order-summary")}
>
  Accept & Continue
</button>

                </div>
                {showAgreement && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="modal-backdrop fade show"
                            onClick={() => setShowAgreement(false)}
                        />

                        <div className="modal fade show d-block" tabIndex="-1">
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div
                                    className="modal-content"
                                    style={{
                                        maxHeight: "90vh",
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <div className="modal-header py-2">
                                        <h6 className="modal-title">Agreement Preview</h6>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowAgreement(false)}
                                        />
                                    </div>

                                    <div
                                        className="modal-body p-0"
                                        style={{ height: "70vh" }}
                                    >
                                        <iframe
                                            src={agreementPdf}
                                            title="Agreement Preview"
                                            width="100%"
                                            height="100%"
                                            style={{ border: "none" }}
                                        />
                                    </div>

                                    <div className="modal-footer py-2">
                                        <button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() => setShowAgreement(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default TermsAndConditions;
