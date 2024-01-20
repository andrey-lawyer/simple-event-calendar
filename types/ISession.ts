import { IronSession } from "iron-session";
import { NextApiRequest } from "next";

export interface IronSessionWithUser
  extends IronSession<{ user: { email: string; userId: string | number } }> {}

export interface IReq extends NextApiRequest {
  session: IronSessionWithUser;
}
