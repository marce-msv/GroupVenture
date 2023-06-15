"use strict"

import { Request, Response, NextFunction } from "express";
// import { Session } from "express-session"

import User from "./../models/user";

interface customRequest extends Request {
  session: any;
  user: any;
}

const authMiddleware = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.session;

    if (!uid) {
      throw new Error("No session uid");
    }

    const user = await User.findOne({ where: { id: uid } });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};

export default authMiddleware;
