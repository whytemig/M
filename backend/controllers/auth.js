const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

authRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        throw new Error("User already registered!");
      }

      const salt = await bcrypt.genSalt();
      const hashP = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        ...req.body,
        password: hashP,
      });

      // remove password with the user
      const { ...others } = newUser._doc;
      // console.log(others);

      res.status(201).json(others);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
);

authRouter.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials. " });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // console.log(token)

     res
       .status(200)
       .json({user, token});
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


authRouter.get('/logout', (req, res) => {
  try {
    res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User Logged out!")
    
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
})

module.exports = authRouter;
