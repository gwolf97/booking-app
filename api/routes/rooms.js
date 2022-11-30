import express from "express";
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

router.post("/:hotelid", verifyAdmin, createRoom)

router.put("/availability/:id", updateRoomAvailability)
router.put("/:id", verifyAdmin, updateRoom)

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

router.get("/:id", getRoom)
router.get("/", getAllRooms)



export default router