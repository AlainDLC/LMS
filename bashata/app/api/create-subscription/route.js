import { NextResponse } from "next/server";
import Stripe from "stripe";

// Skapa en Stripe-instans
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const customerId = "cus_RVnK1lOzb2FmaL"; // Hämta det aktuella kundens ID
    const priceId = "price_1Qckxi2f2Z8QhYWImkffvVRe"; // Ditt price_id

    // Skapa checkout-sessionen
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Ersätt med ditt eget price_id
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // Success-URL med session_id
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`, // Cancel-URL
    });

    // Returnera sessionens id till klienten
    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
