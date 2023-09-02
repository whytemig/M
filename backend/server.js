const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const authRouter = require("./controllers/auth.js");
const userRouter = require('./controllers/user.js')


/* CONFIGURATIONS */
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use("/auth", authRouter);
app.use('/user', userRouter)

/* MONGOOSE SETUP */
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () =>
      console.log(`Server Port: ${port} and DataBase: Connected`)
    );

    // INSERT FAKE DATA LATER......
  })
  .catch((error) => console.log(`${error} did not connect`));
