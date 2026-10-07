const jwt = require("jsonwebtoken");
const auth = require("../models/auth");

const isLogin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        result: false,
        msg: "You need to login",
      });
    }
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.json({
        result: false,
        msg: "Invalid Token",
      });
    }

    const token = parts[1];
    const decode = jwt.verify(token, "mysecret");
    const users = await auth.findById(decode.id);
    // console.log(users);
    // console.log(decode.id);
    
    
    if (users.length == 0 || users[0].token !== token ) {
      return res.json({
        result: false,
        msg: "Invalid or Expired token",
      });
    }

    req.user = decode;
    next();
  } catch (error) {
    return res.json({
      result: false,
      msg: "Invalid or Expired token",
    });
  }
};

module.exports = { isLogin };
