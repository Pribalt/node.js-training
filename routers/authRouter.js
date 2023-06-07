const express = require("express");
const { singup, login, logout } = require("../controllers/authControlers");
const { validateBody } = require("../utils/validation/validateBody");
const {
  createUserValidationSchema,
  loginValidationSchema,
} = require("../utils/validation/authValidationSchemas");

const router = express.Router();

router.post("/singup", validateBody(createUserValidationSchema), singup);
router.post("/login", validateBody(loginValidationSchema), login);
router.post("/logout", logout);

module.exports = { authRouter: router };
