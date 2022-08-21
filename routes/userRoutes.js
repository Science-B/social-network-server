const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const router = express.Router({
  mergeParams: true,
});

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.send(updatedUser);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла попытка, попробуйте позже",
    });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла попытка, попробуйте позже",
    });
  }
});

module.exports = router;
