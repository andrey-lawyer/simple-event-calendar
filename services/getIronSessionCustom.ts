import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getIronSessionCustom() {
  return await getIronSession(cookies(), {
    password: process.env.SESSION_SECRET,
    cookieName: "cookieName",
  });
}
