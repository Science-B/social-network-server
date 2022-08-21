const express = require("express");
const router = express.Router({
  mergeParams: true,
});

router.use("/auth", require("./authRoutes"));
router.use("/comment", require("./commentRoutes"));
router.use("/quality", require("./qualityRoutes"));
router.use("/profession", require("./professionRoutes"));
router.use("/user", require("./userRoutes"));

module.exports = router;
