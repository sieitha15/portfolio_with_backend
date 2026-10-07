const joi = require("joi");
const registerUserSchema = joi.object({
  full_name: joi.string().min(3).required(), 
  phone: joi.number().min(7).required(),
  email: joi.string().min(3).required(),
  password: joi
    .string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])"))
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must not exceed 30 characters",
      "string.pattern.base":
        "Password must contain uppercase, lowercase, number, and special character",
      "any.required": "Password is required",
    }),
});
const loginUserSchema = joi.object({
  email: joi.string().min(3).required(),
  password: joi.string().min(3).required(),
});

const resendEmailUserSchema = joi.object({
  email: joi.string().email().required(),
});

const changePasswordUserSchema = joi.object({
  current_password: joi.string().min(3).required(),
  new_password: joi.string().min(3).required(),
  confirm_password: joi.string().valid(joi.ref("new_password")).required(),
});

const updateProfileUserSchema = joi.object({
  full_name: joi.string().min(3).required(),
  phone: joi.string().pattern(/^\d+$/).required(),
});

const insertUserSchema = joi.object({
  school_name: joi.string().required(),
  degree: joi.string().required(),
  start_date: joi.date().iso().required(),
});

const updateEducationUserSchema = joi.object({
  school_name: joi.string().required(),
  degree: joi.string().required(),
  field_of_study: joi.string().allow(null),
  start_date: joi.date().iso().required(),
  end_date: joi.date().iso().allow(null),
  grade: joi.string().allow(null),
  description: joi.string().allow(null),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  resendEmailUserSchema,
  changePasswordUserSchema,
  updateProfileUserSchema,
  insertUserSchema,
  updateEducationUserSchema,
};
