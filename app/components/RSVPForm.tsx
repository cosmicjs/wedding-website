// app/components/RSVPForm.tsx
"use client";

import { useState } from "react";
import { createCheckoutSession } from "../actions/stripe";
import { addGuest } from "../actions/guests";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function RSVPForm({
  contributionMessage,
  rsvpMessage,
  rsvpTitle,
}: {
  contributionMessage: string;
  rsvpMessage: string;
  rsvpTitle: string;
}) {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addGuest({
        name,
        email,
      });
      if (amount) {
        const { sessionId } = await createCheckoutSession({
          amount,
          name,
          email,
        });
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId });
      } else {
        window.location.href = "/thank-you";
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl mb-4 text-left font-bold text-gray-900 dark:text-white">
        {rsvpTitle}
      </h2>
      <div
        className="mb-8 text-left text-gray-900 dark:text-white"
        dangerouslySetInnerHTML={{ __html: rsvpMessage }}
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
          />
        </div>
        <div
          className="text-gray-600 dark:text-gray-300 text-left"
          dangerouslySetInnerHTML={{ __html: contributionMessage }}
        />
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400">$</span>
          </div>
          <input
            type="number"
            placeholder="Dollar Amount (optional)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            step="0.01"
            className="w-full pl-8 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !name || !email}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium
            py-3 px-4 rounded-lg transition duration-200
            disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "RSVP"}
        </button>
      </form>
    </div>
  );
}
