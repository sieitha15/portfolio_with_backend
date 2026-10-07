const education = require("../services/education");
const getEducation = async (req, res) => {
  try {
    const result = await education.getEducation();
    return res.json({
      result: true,
      msg: "Get education successfully",
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

const insertEducation = async (req, res) => {
  try {
    const result = await education.insertEducation(req.body);

    return res.json({
      result: true,
      msg: "Insert education successfully",
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

const updateEducation = async (req, res) => {
  try {
    const result = await education.updateEducation(req.params.id, req.body);

    return res.json({
      result: true,
      msg: "Update education successfully",
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

const removeEducation = async (req, res) => {
  try {
    const result = await education.removeEducation(req.params.id);

    return res.json({
      result: true,
      msg: "Remove education successfully",
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
  getEducation,
  insertEducation,
  updateEducation,
  removeEducation,
};
