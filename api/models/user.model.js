const { model, Schema } = require("mongoose");
const { hash, genSalt, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide name"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "pleasse provide password"],
      minlength: 8,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  return sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

module.exports = model("User", UserSchema);
