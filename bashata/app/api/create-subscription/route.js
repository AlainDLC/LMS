import { NextResponse } from "next/server";
import Stripe from "stripe";

// Skapa en Stripe-instans
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const priceId = body.priceId; // Få priceId från requesten

    // Skapa checkout-sessionen
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Använd rätt priceId som skickades från klienten
          quantity: 1,
        },
      ],
      mode: "subscription", // Kan också vara "payment" om det är en engångsbetalning
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // Success-URL
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`, // Cancel-URL
    });

    // Returnera sessionens id till klienten
    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
