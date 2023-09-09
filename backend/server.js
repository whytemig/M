const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./controllers/auth.js");
const userRouter = require('./controllers/user.js');
const postRouter = require('./controllers/post.js');
const commentRouter = require('./controllers/comment.js');
const uploadRouter = require('./controllers/upload.js');


/* CONFIGURATIONS */
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ROUTES */
app.use("/auth", authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter)
app.use('/upload', uploadRouter)

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
