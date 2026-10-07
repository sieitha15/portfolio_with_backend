const personal_info = require("../models/personal_info");

const getProfile = async () => {
  let result = await personal_info.getProfile();
  return result;
};

const updateprofile = async (body) => {
  if (!body.full_name || !body.title || !body.bio || !body.email) {
    throw new Error("Fullname, Title, Bio, Email are require");
  }

  let profile = await personal_info.getProfile();

  if (profile.Length == 0) {
    throw new Error("profile not found");
  }

  let id = profile[0].id;
  await personal_info.updateprofile(id, body);
  let data = await personal_info.getProfile();
  return data;
};

module.exports = { getProfile, updateprofile };
