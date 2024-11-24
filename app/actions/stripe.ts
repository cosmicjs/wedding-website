"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
import cosmic from "@/lib/cosmic";

export async function createCheckoutSession({
  amount,
  name,
  email,
}: {
  amount: string;
  name: string;
  email: string;
}) {
  const { object } = await cosmic.objects
    .findOne({ type: "site-settings", slug: "site-settings" })
    .props("metadata.stripe_product_name,metadata.stripe_product_description");
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email, // Pre-fill customer email
      metadata: {
        customerName: name, // Store customer name in metadata
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: object.metadata.stripe_product_name,
              description: object.metadata.stripe_product_description,
            },
            unit_amount: Math.round(parseFloat(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error(error);
    throw new Error("Error creating checkout session");
  }
}
