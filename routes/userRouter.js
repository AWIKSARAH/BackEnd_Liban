import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUserPrev,
  updatePassword,
  getUser,
  updateUser,
  updateUsers,
  login,
} from "../controllers/userController.js";
import auth from "../middleware/jwtAuthenticationMiddleware.js";
import isAdminOrSuperAdmin from "../middleware/adminAuthenticaitonMiddleware.js";
import { getCounts } from "../controllers/homeController.js";
const router = express.Router();

router.post("/login", login);
router.get("/home", auth, getCounts);
router.get("/", auth, isAdminOrSuperAdmin, getUsers);
router.get("/user/:id", auth, getUser);
router.post("/", auth, isAdminOrSuperAdmin, createUser);

router.delete("/:id", auth, isAdminOrSuperAdmin, deleteUser);

router.patch("/profile", auth, updatePassword);
router.patch("/", auth, updateUser);
router.patch("/:id", auth, updateUsers);
router.patch("/conf/:id", auth, isAdminOrSuperAdmin, updateUserPrev);

export default router;
