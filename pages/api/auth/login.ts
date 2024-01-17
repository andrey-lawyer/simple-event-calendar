import { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";


import { createToken } from "@/lib/auth";
import { User } from "@/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await passport.authenticate(
    "local",
    { session: false },
    (err: any, user: User) => {
      if (err || !user) {
        return res
          .status(401)
          .json({ success: false, message: "Authentication failed." });
      }

      // Створення та підпис JWT токена
      const token = createToken(user);

      res.status(200).json({ success: true, data: { user, token } });
    }
  )(req, res);
}
