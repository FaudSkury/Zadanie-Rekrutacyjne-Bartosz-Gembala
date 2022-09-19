"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.addUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const express_validator_1 = require("express-validator");
//GET ALL USERS
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.params;
    let foundUsers;
    let query = {};
    role ? (query.role = role) : null;
    try {
        foundUsers = (yield User_1.default.find(query, "-_id -__v"));
    }
    catch (error) {
        return next(error);
    }
    if (foundUsers.length < 1) {
        return res.status(200).json({ message: "No users found" });
    }
    return res.status(200).json(foundUsers);
});
exports.getUsers = getUsers;
//GET ONE USER BY ID
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let foundUser;
    try {
        foundUser = yield User_1.default.findOne({ id: id }, "-_id -__v");
    }
    catch (error) {
        return next(error);
    }
    if (!foundUser) {
        return res.status(200).json({ message: "No such user found" });
    }
    return res.status(200).json({ foundUser: foundUser });
});
exports.getUser = getUser;
//ADD NEW USER
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: "Wrong data entered, please try again!",
        });
    }
    const { firstName, lastName, email, role } = req.body;
    let foundUser;
    try {
        foundUser = (yield User_1.default.findOne({ email: email }));
    }
    catch (error) {
        return next(error);
    }
    if (foundUser) {
        return res.status(400).json({ message: "User exists already" });
    }
    const usersCount = yield User_1.default.countDocuments({}).exec(); // To create proper ID for the user I count all users in the collection and add 1 to the count
    const ID = usersCount + 1;
    const newUser = new User_1.default({
        id: ID,
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
    });
    try {
        yield newUser.save();
    }
    catch (error) {
        return next(error);
    }
    return res.status(201).send();
});
exports.addUser = addUser;
//UPDATE USER
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: "Wrong data entered, please try again!",
        });
    }
    const { id } = req.params;
    try {
        yield User_1.default.findOneAndUpdate({ id: id }, req.body);
    }
    catch (error) {
        return next(error);
    }
    return res.status(200).send();
});
exports.updateUser = updateUser;
//DELETE USER
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield User_1.default.findOneAndDelete({ id: id });
    }
    catch (error) {
        return next(error);
    }
    return res.status(200).send();
});
exports.deleteUser = deleteUser;
