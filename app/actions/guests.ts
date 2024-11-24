"use server";

import cosmic from "@/lib/cosmic";

interface GuestData {
  name: string;
  email: string;
}

export async function addGuest({ name, email }: GuestData) {
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
