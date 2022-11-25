import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from "../controllers/User.js";

const router = express.Router()

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

router.get("/:id", getUser)

router.get("/", getAllUsers)



export default router