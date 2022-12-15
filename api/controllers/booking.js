import Booking from "../models/Booking.js"
import User from "../models/User.js";

export const createBooking = async (req,res,next) =>{
    const userId = req.params.userid;
    const newBooking = new Booking(req.body)

    try {
        const savedBooking = await newBooking.save()
        try {
            await User.findByIdAndUpdate(userId, {$push : {bookings: savedBooking._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedBooking)
    } catch (error) {
        next(error)
    }
}

export const deleteBooking = async(req,res,next) =>{
    const userId = req.params.userid;
    try {
        await Booking.findByIdAndDelete(req.params.id)
        try {
            await User.findByIdAndUpdate(userId, {$pull : {bookings: req.params.id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json("Booking Deleted")
    } catch (error) {
        next(error)
    }
}


export const getBooking = async(req,res,next) =>{
    try {
        const getBooking = await Booking.findById(req.params.id)
        res.status(200).json(getBooking)
    } catch (error) {
        next(error)
    }
}


export const getAllBookings = async(req,res,next) =>{
    try {
        const bookings = await Booking.find()
        res.status(200).json(bookings)
    } catch (error) {
        next(error)
    }
}