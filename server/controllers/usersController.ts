import bcrypt from 'bcrypt';
// @ts-ignore
import { User } from '../models/associations';
import { Request, Response } from 'express';



const postUser = async (req: Request, res: Response) => {
  const { avatar, firstName, lastName, age, password, email, infoAboutUser } = req.body;
  //   Refactor to
  //   const { password, email } = req.body;
  const user = await User.findOne({ where: { email: email } });
  //   Refactor to
  //   const user = await User.findOne({ where: email });
  if (user) return res.status(409).send({ error: '409', message: 'User already exists' });
  try {
    if (password === '') throw new Error();
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      avatar,
      firstName,
      lastName,
      age,
      password: hash,
      email,
      infoAboutUser,
    });
    //   Refactor to
    //   const user = await User.create({ ...req.body, password: hash });
    let safeUser = {
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
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getUserInfo = async function (req: Request, res: Response) {
  try {
    let user = await User.findOne({ where: { id: req.params.id } });
    res.status(200);
    res.json(user);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    const validatedPass = await bcrypt.compare(password, user.password);

    if (!validatedPass) {
      throw new Error('incorrect password');
    }

    // @ts-ignore
    req.session.uid = user.id;
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
      res.clearCookie('sid');
      res.status(200).send({ message: 'Logout successful' });
    }
  });
};

const editUser = async function (req: Request, res: Response) {
  const { id, info } = req.body;
  try {
    const rowsAffected = await User.update(info, { where: { id: id } });
    const usrUpdated = await User.findByPk(id);
    console.log(usrUpdated);
    res.status(200).json(usrUpdated);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export { postUser, getUserInfo, login, logout, editUser };
