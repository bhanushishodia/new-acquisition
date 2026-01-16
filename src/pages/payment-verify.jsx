import axios from "axios";
import { useSearchParams } from "react-router-dom";

const PaymentVerify = () => {
  const [params] = useSearchParams();
  const paymentId = params.get("paymentId");

  const markSuccess = async () => {
    await axios.post(
      `${API_BASE}/api/manual-payment/verify`,
      { paymentId }
    );

    alert("Payment verified successfully");
  };

  return (
    <div className="container py-5">
      <h2>Payment Verification</h2>

      <div className="card p-4 shadow-sm">
        <p>Payment ID: {paymentId}</p>

        <button className="btn btn-success" onClick={markSuccess}>
          ✅ Mark Payment as Received
        </button>
      </div>
    </div>
  );
};

export default PaymentVerify;
