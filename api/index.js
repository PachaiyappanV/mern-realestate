require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db/connect");
const app = express();

//routers
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

//errorhandlers
const { notFound, errorHandler } = require("./middleware");

app.use(express.json());
//routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//using errorhandlers
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`server is up and running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
