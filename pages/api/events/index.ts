import { NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";

import { IReq, IronSessionWithUser } from "@/types/ISession";

export default async function handler(req: IReq, res: NextApiResponse) {
  await dbConnect();

  try {
    switch (req.method) {
      case "GET":
        const session = (await getIronSession(req, res, {
          password: process.env.SESSION_SECRET,
          cookieName: "cookieName",
        })) as IronSessionWithUser;
        if (!session?.user) {
          return res.status(401).json({
            success: false,
            error: "Unauthorized",
            message: "User not authenticated",
          });
        }

        const userIdGet = session.user.userId;

        try {
          const events = await Event.find({ user: userIdGet });
          res.status(200).json({ success: true, data: events });
        } catch (error) {
          res.status(500).json({
            success: false,
            error: "GetDataError",
            message: "Internal Server Error: Unable to fetch data",
          });
        }
        break;

      case "POST":
        const token = req.headers.authorization?.replace("Bearer ", "");

        if (!token) {
          return res.status(401).json({
            success: false,
            error: "MissingToken",
            message: "Unauthorized: Missing token",
          });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
          return res.status(401).json({
            success: false,
            error: "InvalidToken",
            message: "Unauthorized: Invalid token",
          });
        }

        const userIdPost = decoded.sub;

        try {
          const eventData = { ...req.body, user: userIdPost };
          const event = await Event.create(eventData);
          res.status(201).json({ success: true, data: event });
        } catch (error) {
          res.status(500).json({
            success: false,
            error: "CreateEventError",
            message: "Internal Server Error: Unable to create event",
          });
        }
        break;

      default:
        res.status(400).json({
          success: false,
          error: "InvalidMethod",
          message: "Invalid method",
        });
        break;
    }
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "InvalidToken",
      message: "Unauthorized: Invalid token",
    });
  }
}
