import { Router } from "express";
import { body } from "express-validator";
import { requiresAuth } from "express-openid-connect"; //All routes are protected via this auth0 middleware.
import {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/UsersController";

const router = Router();

router.get("/users/:role?", requiresAuth(), getUsers);

router.get("/user/:id", requiresAuth(), getUser);

router.post(
  "/user",
  requiresAuth(),
  body("email").isEmail().not().isEmpty(),
  body("role").isIn(["user", "admin"]),
  body("firstName").optional().not().isEmpty(),
  body("lastName").optional().not().isEmpty(),
  addUser
);

router.patch(
  "/user/:id",
  requiresAuth(),
  body("role").optional().isIn(["user", "admin"]),
  body("firstName").optional().not().isEmpty(),
  body("lastName").optional().not().isEmpty(),
  updateUser
);

router.delete("/user/:id", requiresAuth(), deleteUser);

export default router;
