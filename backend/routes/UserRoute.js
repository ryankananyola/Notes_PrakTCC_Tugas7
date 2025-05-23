import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  login,
  logout,
} from "../controllers/UsersController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getAccessToken } from "../controllers/TokenController.js";

const router = express.Router();

router.get("/token", getAccessToken);

// Endpoint buat login & logout
router.post("/login", login);
router.delete("/logout", logout);

// Endpoint CRUD users
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.post("/users/", createUser);
router.put("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, deleteUser);

export default router;