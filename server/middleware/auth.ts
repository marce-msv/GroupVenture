'use strict';

import { Request, Response, NextFunction } from 'express';

import { User } from '../models/associations';
import { Session } from 'express-session';

import { UserAttributes, UserModel } from '../models/user';

interface customSession extends Session {
  uid: string;
}

interface customRequest extends Request {
  session: customSession;
  user: UserModel;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = (req as customRequest).session;

    if (!uid) {
      throw new Error('No session uid');
    }

    const user = await User.findOne({ where: { id: uid } });

    if (!user) {
      throw new Error();
    }

    (req as customRequest).user = user;
    next();
  } catch (err: any) {
    console.log(err);
    // return res.sendStatus(401);
    // or this?
    res.status(401).json({ message: err.message });
  }
};

export default authMiddleware;
