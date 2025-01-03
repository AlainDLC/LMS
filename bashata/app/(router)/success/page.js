"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get("session_id");

    if (session_id) {
      setSessionId(session_id);
      fetchPaymentDetails(session_id);
    }

    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  const fetchPaymentDetails = async (sessionId) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    // Hämta session från Stripe API
    const response = await fetch(
      `/api/get-stripe-session?session_id=${sessionId}`
    );
    const sessionDetails = await response.json();

    // Uppdatera betalningsstatusen
    if (sessionDetails && sessionDetails.payment_status === "paid") {
      setPaymentStatus("Payment was successful!");
    } else {
      setPaymentStatus("Payment failed.");
    }
  };

  return (
    <div>
      <h2 className="font-bold text-[24px] text-primary text-center">
        Payment Successful!
      </h2>

      {paymentStatus && <p>{paymentStatus}</p>}
      <p className="font-bold text-[20px] text-primary text-center">
        You will be redirected to the dashboard shortly...
      </p>
    </div>
  );
}
