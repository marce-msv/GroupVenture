'use strict';

import { Request, Response, NextFunction } from 'express';
import { User } from '../models/associations';
import { Session } from 'express-session';
import { UserModel } from '../models/user';

interface customSession extends Session {
  uid?: number;
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
    res.status(401).json({ message: err.message });
  }
};

export { authMiddleware, customRequest };
