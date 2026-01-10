import { Routes, Route } from "react-router-dom";

import WhatsAppPricing from "./pages/whatsapp-pricing";
import AddOns from "./pages/add-ons";
import Coupon from "./pages/coupon";
import GetStartedForm from "./pages/started-form";
import OrderSummary from "./pages/order-summary";
import Payment from "./pages/payment";
import PaymentSuccess from "./pages/payment-success";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WhatsAppPricing />} />
      <Route path="/add-ons" element={<AddOns />} />
      <Route path="/coupon" element={<Coupon />} />
      <Route path="/get-started" element={<GetStartedForm />} />
      <Route path="/order-summary" element={<OrderSummary />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
    </Routes>
  );
};

export default App;
