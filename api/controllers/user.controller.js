const { customError } = require("../utils/customerror");
const test = (req, res) => {
  res.send("Api route is working");
};

const updateUser = async (req, res) => {
  const { body } = req;
  if (req.params.id !== req.userId) {
    next(customError(403, "you can only update your details"));
  }
  try {
    const user = await findOne({ _id: userId });

    user.email = body?.email || user.email;
    user.name = body?.name || user.name;
    user.avatar = body?.avatar || user.avatar;
    if (body.password) {
      user.password = body.password;
    }
    await user.save();

    const { password: pass, ...rest } = user._doc;

    res.status(201).res({
      status: "success",
      data: {
        user: rest,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  test,
  updateUser,
};
