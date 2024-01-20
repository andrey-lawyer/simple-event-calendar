import { headers } from "next/headers";

export const getAllEvents = async () => {
  try {
    // console.log(process.env.BACKEND_API);
    const response = await fetch(`${process.env.BACKEND_API}events`, {
      method: "GET",
      headers: headers(),
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    return null;
  }
};
