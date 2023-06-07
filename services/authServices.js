const bcrypt = require("bcrypt");
const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/User");
const { assignTokens } = require("../utils/assignTokens");

const singupService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });

  if (fetchedUser) {
    throw new HttpError(409, "Email should be unique");
  }

  const hashedPassword = await bcrypt.hash(body.password, 12);

  const newUser = await User.create({
    ...body,
    password: hashedPassword,
  });

  return newUser;
};

const loginService = async (body) => {
  const fetchedUser = await User.findOne({ email: body.email });

  if (!fetchedUser) {
    throw new HttpError(401, "User not found");
  }

  const isPasswordCorrect = bcrypt.compare(body.password, fetchedUser.password);

  if (!isPasswordCorrect) {
    throw new HttpError(401, "Password isn't correct");
  }

  const { accessToken, refreshToken } = assignTokens(fetchedUser);
  await User.findByIdAndUpdate(fetchedUser._id, {
    refresh_token: refreshToken,
  });

  return {
    accessToken,
    user: fetchedUser,
  };
};

const logoutService = () => {};

module.exports = {
  singupService,
  loginService,
  logoutService,
};
