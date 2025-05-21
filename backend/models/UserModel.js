import { Sequelize } from "sequelize";
import db from "../config/db.js";

const Users = db.define(
    "User",
    {
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        refresh_token: Sequelize.TEXT
    }
)

db.sync().then(() => console.log("Database synced"));

export default Users;