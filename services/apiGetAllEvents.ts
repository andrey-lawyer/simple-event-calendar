import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import { getIronSessionCustom } from "./getIronSessionCustom";
import { toast } from "react-toastify";

export const getAllEvents = async () => {
  await dbConnect();
  const session = (await getIronSessionCustom()) as any;
  if (!session?.user) {
    toast.error("User not authenticated");
  }

  const userIdGet = session.user.userId;

  try {
    const events = await Event.find({ user: userIdGet });
    return { data: events };
  } catch (error) {
   toast.error("Internal Server Error: Unable to fetch data");
  }
};
