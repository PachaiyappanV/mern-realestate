const User = require("../models/user.model");

const signup = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internel Server Error",
      code: "500",
    });
  }
};

module.exports = {
  signup,
};
