import User, { IUser } from "../models/User";
import { RequestHandler } from "express";
import { validationResult } from "express-validator";

//GET ALL USERS
export const getUsers: RequestHandler = async (req, res, next) => {
  const { role } = req.params;

  let foundUsers: [IUser];
  let query: { role?: string } = {};
  role ? (query.role = role) : null;
  try {
    foundUsers = (await User.find(query, "-_id -__v")) as [IUser];
  } catch (error) {
    return next(error);
  }

  if (foundUsers.length < 1) {
    return res.status(200).json({ message: "No users found" });
  }

  return res.status(200).json(foundUsers);
};

//GET ONE USER BY ID
export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  let foundUser;
  try {
    foundUser = await User.findOne({ id: id }, "-_id -__v");
  } catch (error) {
    return next(error);
  }

  if (!foundUser) {
    return res.status(200).json({ message: "No such user found" });
  }

  return res.status(200).json({ foundUser: foundUser });
};

//ADD NEW USER
export const addUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Wrong data entered, please try again!",
    });
  }

  const { firstName, lastName, email, role } = req.body as IUser;

  let foundUser: IUser;

  try {
    foundUser = (await User.findOne({ email: email })) as IUser;
  } catch (error) {
    return next(error);
  }
  if (foundUser) {
    return res.status(400).json({ message: "User exists already" });
  }

  const usersCount = await User.countDocuments({}).exec(); // To create proper ID for the user I count all users in the collection and add 1 to the count
  const ID = usersCount + 1;

  const newUser = new User({
    id: ID,
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: role,
  });

  try {
    await newUser.save();
  } catch (error) {
    return next(error);
  }

  return res.status(201).send();
};

//UPDATE USER
export const updateUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Wrong data entered, please try again!",
    });
  }

  const { id } = req.params;

  try {
    await User.findOneAndUpdate({ id: id }, req.body);
  } catch (error) {
    return next(error);
  }

  return res.status(200).send();
};

//DELETE USER
export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.findOneAndDelete({ id: id });
  } catch (error) {
    return next(error);
  }

  return res.status(200).send();
};
