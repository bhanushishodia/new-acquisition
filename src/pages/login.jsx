import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Use environment variable
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const LoginWithOTP = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false); // ✅ IMPORTANT

    // ===== SEND OTP =====
    const sendOtp = async () => {
        if (!email || !name) {
            setMessage("Please enter your name and email");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            await axios.post(`${API_BASE}/api/send-otp`, { email, name });
            setMessage("✅ OTP sent! Check your email.");
            setOtpSent(true);
        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    // ===== VERIFY OTP =====
    const verifyOtp = async () => {
        if (!otp) {
            setMessage("Please enter the OTP");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const res = await axios.post(`${API_BASE}/api/verify-otp`, { email, otp });

            if (res.data.success) {
                localStorage.setItem("userEmail", email);
                localStorage.setItem("userName", name);

                setVerified(true); // ✅ STOP redirect
                setMessage("🎉 OTP verified successfully");
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
            <div
                className="bg-white w-100 rounded-4 shadow-sm p-5"
                style={{ maxWidth: "420px" }}
            >
                <h3 className="fw-semibold">Welcome to Anantya.ai</h3>
                <h5 className="mb-4 text-center text-muted">
                    Secure access via OTP
                </h5>

                {message && (
                    <div className={`alert ${verified ? "alert-success" : "alert-info"} text-center`}>
                        {message}
                    </div>
                )}

                {/* ✅ AFTER OTP VERIFIED */}
                {verified ? (
                    <button
                        className="btn btn-success w-100 mt-3"
                        onClick={() => navigate("/pricing")}
                    >
                        Continue to Pricing
                    </button>
                ) : !otpSent ? (
                    <>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            className="btn btn-primary w-100"
                            onClick={sendOtp}
                            disabled={loading}
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <button
                            className="btn btn-success w-100"
                            onClick={verifyOtp}
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LoginWithOTP;
