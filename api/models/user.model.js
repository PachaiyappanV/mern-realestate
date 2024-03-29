const { model, Schema } = require("mongoose");
const { hash, genSalt } = require("bcryptjs");

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

module.exports = model("User", UserSchema);
