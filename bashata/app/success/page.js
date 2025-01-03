"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const session_id = urlParams.get("session_id");

    if (session_id) {
      setSessionId(session_id);
      fetchPaymentDetails(session_id);
    }
  }, []);

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
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment.</p>

      {paymentStatus && <p>{paymentStatus}</p>}

      <Link href="http://localhost:3000/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
