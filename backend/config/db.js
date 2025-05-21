import { Sequelize } from "sequelize";

const db = new Sequelize("notes-198", "root", "dbnotes198", {
  host: "35.193.237.169",
  dialect: "mysql",
});

export default db;
