"use server";

import cosmic from "@/lib/cosmic";
import axios from "axios";

interface GuestData {
  name: string;
  email: string;
  recaptchaToken: string;
}

export async function addGuest({ name, email, recaptchaToken }: GuestData) {
  const recaptchaVerification = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
  );

  if (
    !recaptchaVerification.data.success ||
    recaptchaVerification.data.score < 0.5
  ) {
    throw new Error("Suspicious activity detected");
  }

  try {
    const response = await cosmic.objects.insertOne({
      title: name,
      type: "guests",
      metadata: {
        name,
        email,
        attending: true, // Since they're submitting the RSVP form, we'll set this to true
      },
    });

    return response;
  } catch (error) {
    console.error("Error adding guest:", error);
    throw new Error("Failed to add guest");
  }
}
