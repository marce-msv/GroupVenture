'use strict';

import bcrypt from 'bcrypt';
import { User } from '../models/associations';
import { UserModel } from '../models/user';
import { Request, Response } from 'express';
import { customRequest } from '../middleware/auth';

const postUser = async (req: Request, res: Response) => {
  if (!req.body.email)
    return res.status(409).send({ error: '409', message: 'Missing input email' });

  if (!req.body.password)
    return res.status(409).send({ error: '409', message: 'Missing input password' });

  const { password, email } = req.body;

  const user = await User.findOne({ where: { email: email } });
  if (user) return res.status(409).send({ error: '409', message: 'User already exists' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, password: hash });
    let safeUser = {
      id: user.id,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      infoAboutUser: user.infoAboutUser,
    };

    res.status(201).json({
      success: true,
      data: safeUser,
      message: 'User created',
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = (req as customRequest).body;

    const user: UserModel | null = await User.findOne({ where: { email: email } });
    if (!user) throw new Error();

    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();

    (req as customRequest).session.uid = user.id;

    res.status(200).send({ success: true, data: user.id, message: 'OK' });
  } catch (err: any) {
    console.log(err);
    res.status(401).send({ error: '401', message: 'Username or password is incorrect' });
  }
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      res.status(500).send({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid').status(200).send({ message: 'Logout successful' });
    }
  });
};

const getUserInfo = async function (req: Request, res: Response) {
  try {
    let user = await User.findOne({ where: { id: req.params.id } });
    if (user) {
      let safeUser = {
        id: req.params.id,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        infoAboutUser: user.infoAboutUser,
      };
      res.status(200).json(safeUser);
    }
  } catch (err: any) {
    console.error(err);
    res.status(400).send({ error: '400', message: 'Bad user request' });
  }
};

const editUser = async function (req: Request, res: Response) {
  const { id } = req.body;
  try {
    const user = await User.findByPk(id);
    console.error(user);
    const userUpdated = await user?.update(req.body.info);
    res.status(200).json(userUpdated);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export default { postUser, getUserInfo, login, logout, editUser };
