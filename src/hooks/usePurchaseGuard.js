// src/hooks/usePurchaseGuard.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function usePurchaseGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("purchaseData"));

    if (!data || !data.plan || !data.user) {
      navigate("/", { replace: true });
    }
  }, [navigate]);
}
