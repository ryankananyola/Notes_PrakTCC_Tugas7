import express from "express";
import cors from "cors";
import NotesRoute from "./routes/NotesRoute.js";
import UserRoute from "./routes/UserRoute.js";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express();
app.set("view engine", "ejs");

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3001", 
    credentials: true,
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(NotesRoute);

app.listen(3000, () => console.log("Server connected"));
