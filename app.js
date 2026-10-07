const express = require("express");
const app = express();
const personal_info_Routes = require("./routers/personal_info");
const authRoutes = require("./routers/auth");
const educationRoutes = require("./routers/education");
app.use(express.json());

app.use(personal_info_Routes);
app.use(authRoutes);
app.use(educationRoutes);

app.listen(3000, () => {});
