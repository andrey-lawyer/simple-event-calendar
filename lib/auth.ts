import jwt from "jsonwebtoken";

import { User } from "@/models/User";

export const createToken = (user: User): string => {
  const payload = {
    sub: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
};
