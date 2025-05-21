import express from "express";
import {
    getNotes,
    getNotesById,
    createNotes,
    updateNotes,
    deleteNotes
} from "../controllers/UserController.js";
import {
    Register,
    Login,
    refreshToken,
    logout,
} from "../controllers/UsersController.js";
import {
    verifyToken
} from "../middleware/verifyToken.js";

const router = express.Router();

// User Routes
router.get("/token", refreshToken);
router.post("/register", Register);
router.post("/login", Login);
router.delete("/logout", logout);

// Notes Routes
router.get("/notes/", verifyToken, getNotes);
router.get("/notes/:id", verifyToken, getNotesById);
router.post("/add-notes", verifyToken, createNotes);
router.put("/notes/:id", verifyToken, updateNotes);
router.delete("/notes/:id", verifyToken, deleteNotes);

router.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

export default router;
