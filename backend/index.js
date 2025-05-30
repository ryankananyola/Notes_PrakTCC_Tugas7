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
  cors(
    {
      origin: ["http://localhost:3000", "https://notesryan-dot-g-08-450802.uc.r.appspot.com"],
      credentials: true,
    }
  )
);
app.use(express.json());
app.use("/users", UserRoute);
app.use(NotesRoute);

app.listen(5000, () => console.log("Server connected"));
