const personal_info = require("../services/personal_info");
const getProfile = async (req, res) => {
  try {
    let result = await personal_info.getProfile();
    return res.json({
      result: true,
      msg: "Get Profile success",
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

const updateprofile = async (req, res) => {
  try {
    let result = await personal_info.updateprofile(req.body);
    return res.json({
      result: true,
      msg: "Update profile success",
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

module.exports = { getProfile, updateprofile };
