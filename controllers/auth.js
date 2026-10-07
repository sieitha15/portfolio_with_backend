const auth = require("../services/auth");
const register = async (req, res) => {
  try {
    const result = await auth.register(req.body);
    return res.json({
      result: true,
      msg: "Login successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      result: false,
      msg: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let result = await auth.login(req.body);
    return res.json({
      result: true,
      msg: "Login successfully",
      data: result,
    });
  } catch (error) {
    return res.json({
      result: false,
      msg: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const result = await auth.logout(req.user.id);
    console.log(req.user);
    return res.json({
      result: true,
      msg: "Logout successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      result: false,
      msg: error.message,
    });
  }
};
const verifyEmail = async (req, res) => {
  try {
    const result = await auth.verifyEmail(req.query.token);
    return res.json({
      result: true,
      msg: "Verify success",
    });
  } catch (error) {
    console.log(error);
  }
};

const resendEmail = async (req, res) => {
  try {
    const result = await auth.resendEmail(req.body);
    return res.json({
      result: true,
      msg: "Resend Email success",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      result: false,
      msg: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    await auth.changePassword(req.user.id, req.body);
    return res.json({
      result: true,
      msg: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      result: false,
      msg: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const result = await auth.getMe(req.user.id);

    return res.json({
      result: true,
      msg: "Get Me Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      result: false,
      msg: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const result = await auth.updateProfile(req.user.id, req.body);
    return res.json({
      result: true,
      msg: "Update successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      result: false,
      msg: error.message,
    });
  }
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
