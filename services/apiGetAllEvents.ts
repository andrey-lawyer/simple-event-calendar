// import dbConnect from "@/lib/dbConnect";
// import Event from "@/models/Event";
// import { IEvents } from "@/types/eventForm";
// import { getIronSession } from "iron-session";
import { headers, cookies } from "next/headers";

// async function getIronSessionCustom() {
//   return await getIronSession(cookies(), {
//     password: process.env.SESSION_SECRET,
//     cookieName: "cookieName",
//   });
// }

export const getAllEvents = async () => {
  //
  //   await dbConnect();
  //   const session = (await getIronSessionCustom()) as any;
  //   console.log(session);
  //   if (!session?.user) {
  //     console.log("User not authenticated");
  //   }

  //   const userIdGet = session.user.userId;

  //   try {
  //     const events = await Event.find({ user: userIdGet });
  //     return { data: events };
  //   } catch (error) {
  //     console.log("Internal Server Error: Unable to fetch data");
  //   }
  // };

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
