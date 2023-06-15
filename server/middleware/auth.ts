'use strict';

import { Request, Response, NextFunction } from 'express';

// import { User } from '../models/associations';
import User from './../models/user';
import { Session } from 'express-session';

import { UserAttributes } from '../models/user';

interface customSession extends Session {
  uid: string;
}

interface customRequest extends Request {
  session: customSession;
  user: UserAttributes;
}

const authMiddleware = async (req: customRequest, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.session;

    if (!uid) {
      throw new Error('No session uid');
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
