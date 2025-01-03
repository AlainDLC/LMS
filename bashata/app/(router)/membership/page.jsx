"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Hämta Stripe-instansen
const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
};

const fetchPostJSON = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      // Skicka begäran till API-rutten för att skapa en checkout-session
      const checkoutSession = await fetchPostJSON("/api/create-subscription", {
        priceId: "price_1Qckxi2f2Z8QhYWImkffvVRe", // Använd ett giltigt priceId från Stripe Dashboard
      });

      if (checkoutSession.statusCode === 500) {
        console.error("Failed to create session:", checkoutSession.message);
        return;
      }

      // Hämta Stripe-instansen och omdirigera användaren till Stripe Checkout
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });

      if (error) {
        console.warn("Error redirecting to checkout:", error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Första kortet – Alla kurser upplåsta */}
      <Card className="bg-white shadow-lg rounded-lg p-4">
        <CardHeader>
          <CardTitle>Subscription – Alla kurser upplåsta</CardTitle>
          <CardDescription>
            Få tillgång till alla kurser och material utan begränsningar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Med detta abonnemang får du full tillgång till alla våra kurser och
            innehåll på plattformen.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCheckout} disabled={isLoading}>
            {isLoading ? "Redirecting..." : "Proceed to Checkout"}
          </Button>
        </CardFooter>
      </Card>

      {/* Andra kortet – Enskilda kurser */}
      <Card className="bg-white shadow-lg rounded-lg p-4">
        <CardHeader>
          <CardTitle>Subscription – Enskilda kurser</CardTitle>
          <CardDescription>
            Välj och betala för enskilda kurser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Med detta abonnemang kan du välja specifika kurser och betala för
            dem individuellt.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCheckout} disabled={isLoading}>
            {isLoading ? "Redirecting..." : "Proceed to Checkout"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
