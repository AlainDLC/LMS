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
import InProgressCourseList from "../dashboard/_components/InProgressCourseList";
import { Progress } from "@/components/ui/progress";

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
  const [isLoadingAllAccess, setIsLoadingAllAccess] = useState(false);
  const [isLoadingIndividual, setIsLoadingIndividual] = useState(false);

  // Hantera checkout och skapa session
  const handleCheckout = async (priceId, isAllAccess) => {
    if (isAllAccess) setIsLoadingAllAccess(true);
    else setIsLoadingIndividual(true);

    try {
      // Skicka begäran till API-rutten för att skapa en checkout-session
      const checkoutSession = await fetchPostJSON("/api/create-subscription", {
        priceId, // Skicka specifikt priceId för det valda kortet
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
      if (isAllAccess) setIsLoadingAllAccess(false);
      else setIsLoadingIndividual(false);
    }
  };
  const Spinner = () => (
    <div className="w-44 bg-gray-200 rounded-full h-2.5">
      <div className="bg-green-300 h-2.5 rounded-full animate-progress"></div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 w-full mx-auto mt-4">
        {/* First card – All courses unlocked */}
        <Card className="bg-white shadow-lg rounded-lg p-4">
          <CardHeader>
            <CardTitle>Subscription – All courses unlocked</CardTitle>
            <CardDescription>
              Get access to all courses and materials without limitations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              With this subscription, you get full access to all our courses and
              content on the platform.
            </p>
          </CardContent>
          <CardFooter>
            {isLoadingAllAccess ? (
              <div className="flex items-center justify-center w-full h-9">
                <Spinner />
              </div>
            ) : (
              <Button
                onClick={() =>
                  handleCheckout("price_1QdAWO2f2Z8QhYWIEDLpKCPb", true)
                }
                disabled={isLoadingAllAccess}
                className="w-full"
              >
                Checkout now
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Second card – Individual courses */}
        <Card className="bg-white shadow-lg rounded-lg p-4">
          <CardHeader>
            <CardTitle>Subscription – Individual courses</CardTitle>
            <CardDescription>
              Choose and pay for individual courses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              With this subscription, you can choose specific courses and pay
              for them individually.
            </p>
          </CardContent>
          <CardFooter>
            {isLoadingIndividual ? (
              <div className="flex items-center justify-center w-full h-9">
                <Spinner />
              </div>
            ) : (
              <Button
                onClick={() =>
                  handleCheckout("price_1Qckxi2f2Z8QhYWImkffvVRe", false)
                }
                disabled={isLoadingIndividual}
                className="w-full"
              >
                Checkout now
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
