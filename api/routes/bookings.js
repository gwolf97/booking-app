import express from "express";
import { createBooking, deleteBooking, getAllBookings, getBooking } from "../controllers/booking.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router()

router.post("/:userid", verifyUser, createBooking)

router.delete("/:id/:userid", verifyUser, deleteBooking)

router.get("/:id", verifyUser, getBooking)

router.get("/", verifyAdmin, getAllBookings)

export default router