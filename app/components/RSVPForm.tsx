// app/components/RSVPForm.tsx
"use client";

import { useState, useEffect } from "react";
import { createCheckoutSession } from "../actions/stripe";
import { addGuest } from "../actions/guests";
import { loadStripe } from "@stripe/stripe-js";
import { QRCodeSVG } from "qrcode.react";
import { FaCreditCard, FaBitcoin } from "react-icons/fa";
const bitcoinAddress = process.env.NEXT_PUBLIC_BITCOIN_ADDRESS;

declare global {
  interface Window {
    grecaptcha: {
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// Load the reCAPTCHA script
const loadReCaptcha = () => {
  const script = document.createElement("script");
  script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
  document.body.appendChild(script);
};

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
  const [quantity, setQuantity] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "bitcoin">(
    "stripe"
  );
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);

  useEffect(() => {
    loadReCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const recaptchaToken = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: "submit" }
      );

      await addGuest({
        name,
        email,
        quantity,
        recaptchaToken,
      });

      if (paymentMethod === "stripe" && amount) {
        const { sessionId } = await createCheckoutSession({
          amount,
          name,
          email,
        });
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId });
      }
      window.location.href = "/thank-you";
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBitcoinSelect = () => {
    setPaymentMethod("bitcoin");
    setAmount("");
  };

  const handleCopyAddress = async () => {
    if (!bitcoinAddress) return;
    try {
      await navigator.clipboard.writeText(bitcoinAddress);
      setShowCopiedTooltip(true);
      setTimeout(() => setShowCopiedTooltip(false), 2000); // Hide after 2 seconds
    } catch (err) {
      console.error("Failed to copy address:", err);
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
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Number of Guests
          </label>
          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>
        <div
          className="pt-2 text-gray-600 dark:text-gray-300 text-left text-lg font-semibold"
          dangerouslySetInnerHTML={{ __html: contributionMessage }}
        />
        {bitcoinAddress && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Payment Method
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setPaymentMethod("stripe")}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  paymentMethod === "stripe"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <FaCreditCard />
                <span>Credit Card</span>
              </button>
              <button
                type="button"
                onClick={handleBitcoinSelect}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  paymentMethod === "bitcoin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <FaBitcoin />
                <span>Bitcoin</span>
              </button>
            </div>
          </div>
        )}

        {paymentMethod === "stripe" && (
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
        )}

        {paymentMethod === "bitcoin" && (
          <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-center">
            <h3 className="text-xl mb-4 text-gray-900 dark:text-white">
              Send Bitcoin Payment
            </h3>
            <div
              className="flex justify-center cursor-pointer"
              onClick={handleCopyAddress}
              title="Click to copy Bitcoin address"
            >
              <QRCodeSVG
                value={`bitcoin:${bitcoinAddress}`}
                className="dark:bg-white dark:p-2 dark:rounded-lg"
              />
            </div>
            <div className="relative">
              <p
                className="mt-4 text-sm break-all text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500 transition-colors"
                onClick={handleCopyAddress}
                title="Click to copy Bitcoin address"
              >
                {bitcoinAddress}
              </p>
              {showCopiedTooltip && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 text-sm text-white bg-gray-800 dark:bg-gray-700 rounded-md opacity-90">
                  Copied!
                </div>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !name || !email}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium
            py-3 px-4 rounded-lg transition duration-200
            disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Processing..." : "RSVP"}
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy" className="underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="https://policies.google.com/terms" className="underline">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </form>
    </div>
  );
}
