const education = require("../models/education");
const getEducation = async () => {
  const result = await education.getEducation();
  return result;
};

const insertEducation = async (body) => {
  const result = await education.insertEducation(body);
  return result;
};

const updateEducation = async (id, body) => {
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    throw new Error("A valid education ID is required");
  }

  return education.updateEducation(Number(id), body);
};

const removeEducation = async (id) => {
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    throw new Error("A valid education ID is required");
  }

  return education.removeEducation(Number(id));
};

module.exports = {
  getEducation,
  insertEducation,
  updateEducation,
  removeEducation,
};
