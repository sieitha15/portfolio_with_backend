const personal_info = require("../controllers/personal_info");
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/personal", auth.isLogin, personal_info.getProfile);
router.put("/personal", auth.isLogin, personal_info.updateprofile);

module.exports = router;
