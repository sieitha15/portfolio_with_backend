const auth = require("../models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailService = require("./mailService");

const register = async (body) => {
  let checkEmail = await auth.findByEmail(body.email);
  if (checkEmail.length > 0) {
    throw new Error("Email is already exist");
  }
  const hashPassword = await bcrypt.hash(body.password, 10);
  const verification_token = crypto.randomBytes(32).toString("hex");
  const verification_expires = new Date(Date.now() + 60 * 60 * 1000); //1h

  body.password = hashPassword;
  body.verification_token = verification_token;
  body.verification_expires = verification_expires;
  const result = await auth.register(body);

  await mailService.sendVerificationEmail(body.email, verification_token);

  const row = await auth.findById(result);
  return row;
};

const login = async (body) => {
  let checkEmail = await auth.findByEmail(body.email);
  if (checkEmail.length == 0) {
    throw new Error("email and password invalid");
  }

  let checkPassword = await bcrypt.compare(
    body.password,
    checkEmail[0].password,
  );

  if (checkPassword == false) {
    throw new Error("email and password invalid");
  }

  if (checkEmail[0].is_verified == 0) {
    throw new Error("email not yet verified");
  }
  const token = jwt.sign({ id: checkEmail[0].id }, "mysecret", {
    expiresIn: "1D",
  });

  await auth.updateToken(checkEmail[0].id, token);

  return {
    id: checkEmail[0].id,
    email: checkEmail[0].email,
    token,
  };
};

const logout = async (id) => {
  await auth.updateToken(id, null);
};

const verifyEmail = async (token) => {
  if (!token) {
    throw new Error("Toke is require");
  }
  let checkToken = await auth.findVerificationToken(token);
  console.log(checkToken);
  if (checkToken.length == 0) {
    throw new Error("Toke Invalided");
  }

  if (checkToken[0].is_verified) {
    throw new Error("Email Already verified");
  }
  if (
    !checkToken[0].verification_expires ||
    new Date(checkToken[0].verification_expires) < new Date()
  ) {
    throw new Error("Link is expired");
  }

  await auth.verifyEmail(checkToken[0].id);
};

const resendEmail = async (body) => {
  const checkEmail = await auth.findByEmail(body.email);
  if (checkEmail.length == 0) {
    throw new Error("Invalid Email");
  }

  if (checkEmail[0].is_verified) {
    throw new Error("Email already verify");
  }
  const verification_token = crypto.randomBytes(32).toString("hex");
  const verification_expires = new Date(Date.now() + 60 * 60 * 1000); //1h
  const data = {
    id: checkEmail[0].id,
    verification_token,
    verification_expires,
  };

  await auth.updateVerificationToken(data); // Update to DB
  await mailService.sendVerificationEmail(body.email, verification_token); // Send to user
};

const changePassword = async (userId, body) => {
  const { current_password, new_password, confirm_password } = body;

  const users = await auth.findById(userId);
  if (users.length === 0) {
    throw new Error("User not found");
  }
  const valid = await bcrypt.compare(current_password, users[0].password);
  if (!valid) {
    throw new Error("Password not currect");
  }
  const samePassword = await bcrypt.compare(new_password, users[0].password);

  if (samePassword) {
    throw new Error("New password must be different");
  }
  const hashedPassword = await bcrypt.hash(new_password, 10);
  await auth.changePassword(userId, hashedPassword);
};

const getMe = async (id) => {
  const result = await auth.findById(id);
  return result;
};

const updateProfile = async (id, body) => {
  await auth.updateProfile(id, body);
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  resendEmail,
  changePassword,
  getMe,
  updateProfile,
};
