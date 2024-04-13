const jwt = require("jsonwebtoken");
const { customError } = require("./customerror");

const verifyUser = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    next(customError(401, "Authentication invalid"));
  }
  try {
    const payload = await jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    next(customError(401, "Authentication invalid"));
  }
};

module.exports = {
  verifyUser,
};
