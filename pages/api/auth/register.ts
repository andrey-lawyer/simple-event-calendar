import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import dbConnect from "@/lib/dbConnect";
import { IUser } from "@/lib/auth";

import User from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    if (req.method === "POST") {
      const { email, password } = req.body;

      // Перевірка, чи існує користувач з такою ж електронною поштою
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists." });
      }

      // Хешування паролю
      const hashedPassword = await bcrypt.hash(password, 10);

      // Створення нового користувача
      const newUser = (await User.create({
        email,
        password: hashedPassword,
      })) as IUser;

      res.status(201).json({
        success: true,
        message: "Registration successful.",
        emailUser: newUser.email,
      });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
}
