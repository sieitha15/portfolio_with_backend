const express = require("express");
const auth = require("../controllers/auth");
const check = require("../middlewares/auth");
const router = express.Router();
const validate = require("../middlewares/validate");
const schema = require("../validators/auth");

router.post("/register", validate(schema.registerUserSchema), auth.register);
router.post("/login", validate(schema.loginUserSchema), auth.login);
router.put("/logout", check.isLogin, auth.logout);
router.get("/auth/verify-email", auth.verifyEmail);
router.put(
  "/resend-email",
  validate(schema.resendEmailUserSchema),
  auth.resendEmail,
);
router.put(
  "/change-password",
  check.isLogin,
  validate(schema.changePasswordUserSchema),
  auth.changePassword,
);
router.get("/get-me", check.isLogin, auth.getMe);
router.put(
  "/update-profile",
  check.isLogin,
  validate(schema.updateProfileUserSchema),
  auth.updateProfile,
);

module.exports = router;
