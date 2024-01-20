import jwt from "jsonwebtoken";

import { User } from "@/models/User";

export interface IUser extends User {
  _id: string | number;
}

export const createToken = (user: IUser): string => {
  const payload = {
    sub: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });
};
