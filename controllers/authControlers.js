const {
  singupService,
  loginService,
  logoutService,
} = require("../services/authServices");
const { asyncWrapper } = require("../utils/asyncWrapper");

const singup = asyncWrapper(async (req, res) => {
  const user = await singupService(req.body);

  res.status(201).json(user);
});

const login = asyncWrapper(async (req, res) => {
  const { accessToken, user } = await loginService(req.body);

  res.status(200).json({ accessToken, user });
});

const logout = asyncWrapper(async (req, res) => {});

module.exports = {
  singup,
  login,
  logout,
};
