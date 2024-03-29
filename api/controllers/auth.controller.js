const User = require("../models/user.model");

const signup = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};
