const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  host: "localhost",
  service: "gmail",
  auth: {
    user: "thasiei06@gmail.com",
    pass: "khbouvdqbketsvrm",
  },
});

module.exports = transport;
