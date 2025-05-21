import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Notes = db.define(
    "notes",
    {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      title: Sequelize.STRING,
      text: Sequelize.STRING,
      date: Sequelize.DATEONLY,
    }
);

db.sync().then(() => console.log("Database synced"));

export default Notes;
