import { Sequelize } from "sequelize";
import db from "../config/db.js";

const User = db.define(
  "user", 
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    gender: Sequelize.STRING,
    password: Sequelize.STRING,
    refresh_token: Sequelize.TEXT,
  }
);

db.sync().then(() => console.log("Database synced"));

export default User;