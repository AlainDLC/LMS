"use client";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function YourComponent() {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    // Hämta den publika Stripe-nyckeln från miljövariabeln
    const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

    if (stripePublicKey) {
      // Ladda Stripe med public key
      loadStripe(stripePublicKey).then((stripeInstance) => {
        setStripe(stripeInstance);
      });
    } else {
      console.error("Stripe public key is missing or incorrect.");
    }
  }, []);

  const handleClick = async () => {
    if (!stripe) return; // Vänta tills Stripe är laddad

    // Din logik för att skapa en Stripe-session eller checkout
    try {
      const response = await fetch("/api/create-subscritpion", {
        method: "POST",
      });
      const session = await response.json();
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        console.error("Stripe checkout error:", error.message);
      }
    } catch (error) {
      console.error("Error handling checkout:", error);
    }
  };

  return <button onClick={handleClick}>Checkout with Stripe</button>;
}
