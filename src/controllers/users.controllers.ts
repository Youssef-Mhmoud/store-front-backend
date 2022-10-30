import { NextFunction, Request, Response } from 'express';
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

export const getMany = async (
  _: Request,
  res: Response,
) => {
  try {
    const users = await userModel.getMany();
    res.json({
      status: 'success',
      data: users,
      message: 'User retrieved successfuly',
    });
  } catch (error) {
    console.log(error)
  }
}

export const getOne = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: user,
      message: 'User retrieved successfuly',
    });
  } catch (error) {
    console.log(error)
  }
}

export const updateOne = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await userModel.updateOne(req.body);
    res.json({
      status: 'success',
      data: user,
      message: 'User Updated successfuly',
    });
  } catch (error) {
    console.log(error)
  }
}

export const deleteOne = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: user,
      message: 'User Deleted successfuly',
    });
  } catch (error) {
    console.log(error)
  }
}