import { NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";

import dbConnect from "@/lib/dbConnect";

import { IUser, createToken } from "@/lib/auth";

import User from "@/models/User";

import { IReq, IronSessionWithUser } from "@/types/ISession";

export default async function handler(req: IReq, res: NextApiResponse) {
  await dbConnect();
  console.log(process.env.SESSION_SECRET);
  const session = (await getIronSession(req, res, {
    password: process.env.SESSION_SECRET,
    cookieName: "cookieName",
  })) as IronSessionWithUser;

  if (req.method !== "POST") {
    return res.status(400).json({ success: false, message: "Invalid method" });
  }

  const { email, password } = req.body;

  try {
    const user = (await User.findOne({ email })) as IUser;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = createToken(user);

    session.user = { email: user.email, userId: user._id };
    await session.save();

    return res.status(200).json({
      success: true,
      user: { email: user.email, userId: user._id },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
