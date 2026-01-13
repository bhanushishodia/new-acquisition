import { Routes, Route } from "react-router-dom";

import WhatsAppPricing from "./pages/whatsapp-pricing";
import AddOns from "./pages/add-ons";
import Coupon from "./pages/coupon";
import GetStartedForm from "./pages/started-form";
import OrderSummary from "./pages/order-summary";
import Payment from "./pages/payment";
import PaymentPending from "./pages/payment-pending";
import PaymentSuccess from "./pages/payment-success";
import PaymentVerify from "./pages/payment-verify";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WhatsAppPricing />} />
      <Route path="/add-ons" element={<AddOns />} />
      <Route path="/coupon" element={<Coupon />} />
      <Route path="/get-started" element={<GetStartedForm />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-pending" element={<PaymentPending />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-verify" element={<PaymentVerify />} />

    </Routes>
  );
};

export default App;
