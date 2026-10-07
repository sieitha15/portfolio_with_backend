const { allow } = require("joi");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (error) {
    return res.json({
      message: "Validate error",
      details: error.details.map((d) => d.message),
    });
  }
  req.body = value;
  next();
};

module.exports = validate;
