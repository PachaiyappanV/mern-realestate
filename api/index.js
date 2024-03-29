require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db/connect");
const app = express();

//routers
const userRouter = require("./routes/user.route");

//routes
app.use("/api", userRouter);

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
