import { Request, Response } from 'express';
import UserModel from '../models/user.model';

const userModel = new UserModel();

export const create = async (req: Request, res: Response) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: 'success',
      data: { ...user },
      message: 'User create successfuly',
    });
  } catch (error) {
    console.log(error);
  }
};
