const User = require("../models/user.model");
const { customError } = require("../utils/customerror");

const signUp = async (req, res, next) => {
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

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(customError(404, "Email and Password required"));
    }
    const user = await User.findOne({ email });
    const { password: pass, ...rest } = user._doc;
    if (!user) {
      return next(customError(404, "Invalid Credentials"));
    }
    const isPasswordCorrect = await user.comparePassword;
    if (!isPasswordCorrect) {
      return next(customError(404, "Invalid Credentials"));
    }
    const token = user.createJWT();
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (err) {
    next(err);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = user.createJWT();
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newUser = {
        name:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: generatedPassword,
        avatar: req.body.avatar,
      };
      const user = await User.create(newUser);
      const { password: pass, ...rest } = user;
      const token = user.createJWT();
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
  signIn,
  google,
};
