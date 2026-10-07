const pool = require("../config/db");
const createProfile = async () => {
  try {
    await pool.query(
      `insert into personal_info
        (
        full_name,
        title,
        bio,
        email,
        phone) values
        (?, ?, ?, ?, ?)
        `,
      [
        "Tha Sie I",
        "Web Developer",
        "I am Web Developer",
        "thasiei06@gmail.com",
        "085278275",
      ],
    );
    console.log(`send insert success`);
  } catch (error) {
    console.log(`send insert failed`);
    console.log(error);
  }
};
createProfile();
