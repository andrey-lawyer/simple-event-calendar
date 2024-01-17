import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PassportStatic } from "passport";

import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { createToken } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest & { login: PassportStatic["authenticate"] },
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
      const newUser = await User.create({ email, password: hashedPassword });

      // Автентифікація користувача та створення та підпис JWT токена
      req.login(newUser, { session: false }, (err: any) => {
        if (err) {
          return res.status(400).json({ success: false, message: err.message });
        }

        const token = createToken(newUser);

        return res
          .status(201)
          .json({ success: true, data: { user: newUser, token } });
      });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message });
  }
}
