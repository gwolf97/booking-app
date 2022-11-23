import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router()

router.post("/", async (req,res) => {

    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json("savedHotel")
    } catch (error) {
        res.status(500).json(err)
    }
})

router.put("/", (req,res) => {

})

router.delete("/", (req,res) => {

})

router.get("/", (req,res) => {

})

router.get("/", (req,res) => {

})


export default router