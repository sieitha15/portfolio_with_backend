const express = require("express");
const education = require("../controllers/education");
const check = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const schema = require("../validators/auth");
const router = express.Router();

router.get("/get-education", check.isLogin, education.getEducation);
router.post(
  "/insert-education",
  check.isLogin,
  validate(schema.insertUserSchema),
  education.insertEducation,
);
router.put(
  "/update-education/:id",
  check.isLogin,
  validate(schema.updateEducationUserSchema),
  education.updateEducation,
);
router.delete(
  "/remove-education/:id",
  check.isLogin,
  education.removeEducation,
);

module.exports = router;
