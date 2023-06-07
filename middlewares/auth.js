const jwt = require("jsonwebtoken");
const { HttpError } = require("..//utils");
const { User } = require("../models/User");
const { assignTokens } = require("../utils/assignTokens");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

  if (bearer !== "Bearer" || !token) {
    return next(new HttpError(401, "Invalid or absent token"));
  }

  const decodedPayload = jwt.decode(token);
  let fetchedUser;

  try {
    fetchedUser = await User.findById(decodedPayload.userId);

    if (!fetchedUser || !fetchedUser.refresh_token) {
      throw new HttpError(401, "User not found or no refresh token");
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = fetchedUser;
    next();
  } catch (error) {
    if (error.name !== "TokenExpiredError") {
      return next(new HttpError(401));
    }

    try {
      jwt.verify(fetchedUser.refresh_token, REFRESH_TOKEN_SECRET);
      const { accessToken, refreshToken } = assignTokens(fetchedUser);
      await User.findByIdAndUpdate(fetchedUser._id, { refreshToken });

      res.status(200).json({
        accessToken,
      });
    } catch (error) {
      next(new HttpError(401, "Refresh token is expired"));
    }
  }
};
