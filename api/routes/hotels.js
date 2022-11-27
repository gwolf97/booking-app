import express from "express";
import { countHotelsByCity, createHotel, deleteHotel, getAllHotels, getHotel, updateHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router()

router.post("/", verifyAdmin, createHotel)

router.put("/:id", verifyAdmin, updateHotel)

router.delete("/:id", verifyAdmin, deleteHotel)

router.get("/getHotel/:id", getHotel)

router.get("/", getAllHotels)
router.get("/countByCity", countHotelsByCity)
router.get("/countByType", getAllHotels)



export default router