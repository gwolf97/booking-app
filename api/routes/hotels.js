import express from "express";
import { countHotelsByCity, countHotelsByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

router.post("/", verifyAdmin, createHotel)

router.put("/:id", verifyAdmin, updateHotel)

router.delete("/:id", verifyAdmin, deleteHotel)

router.get("/getHotel/:id", getHotel)

router.get("/", getAllHotels)
router.get("/countByCity", countHotelsByCity)
router.get("/countByType", countHotelsByType)

router.get("/rooms/:id", getHotelRooms)

export default router