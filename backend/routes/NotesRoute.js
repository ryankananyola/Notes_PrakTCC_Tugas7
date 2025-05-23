import express from "express";
import {
    getNotes,
    getNotesById,
    createNotes,
    updateNotes,
    deleteNotes
} from "../controllers/NotesController.js";

const router = express.Router();

// Notes Routes
router.get("/notes/", getNotes);
router.get("/notes/:id",  getNotesById);
router.post("/add-notes", createNotes);
router.put("/notes/:id", updateNotes);
router.delete("/notes/:id", deleteNotes);

router.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

export default router;
