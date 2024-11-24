// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { amount } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Wedding Gift",
              description: "Gift for Sarah & Tony's Wedding",
            },
            unit_amount: Math.round(parseFloat(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/thank-you`,
      cancel_url: `${request.headers.get("origin")}/`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
