const uploadRouter = require("express").Router();
const multer = require("multer");
const authToken = require('../middleware/authToken')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.filename);
  },
});

const upload = multer({
  storage: storage,
});

uploadRouter.post(
  "/image",
  authToken,
  upload.single("image"),
  async (req, res) => {
    try {
      return res.status(200).json({ msg: "image successfully uploaded" });
    } catch (error) {
      console.error(error);
    }
  }
);

module.exports = uploadRouter;
