"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const express_openid_connect_1 = require("express-openid-connect"); //All routes are protected via this auth0 middleware.
const UsersController_1 = require("../controllers/UsersController");
const router = (0, express_1.Router)();
router.get("/users/:role?", (0, express_openid_connect_1.requiresAuth)(), UsersController_1.getUsers);
router.get("/user/:id", (0, express_openid_connect_1.requiresAuth)(), UsersController_1.getUser);
router.post("/user", (0, express_openid_connect_1.requiresAuth)(), (0, express_validator_1.body)("email").isEmail().not().isEmpty(), (0, express_validator_1.body)("role").isIn(["user", "admin"]), (0, express_validator_1.body)("firstName").optional().not().isEmpty(), (0, express_validator_1.body)("lastName").optional().not().isEmpty(), UsersController_1.addUser);
router.patch("/user/:id", (0, express_openid_connect_1.requiresAuth)(), (0, express_validator_1.body)("role").optional().isIn(["user", "admin"]), (0, express_validator_1.body)("firstName").optional().not().isEmpty(), (0, express_validator_1.body)("lastName").optional().not().isEmpty(), UsersController_1.updateUser);
router.delete("/user/:id", (0, express_openid_connect_1.requiresAuth)(), UsersController_1.deleteUser);
exports.default = router;
