import Hotel from "../models/Hotel.js"

export const createHotel = async(req,res,next) =>{

    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}


export const updateHotel = async(req,res,next) =>{
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}


export const deleteHotel = async(req,res,next) =>{
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted")
    } catch (error) {
        next(error)
    }
}


export const getHotel = async(req,res,next) =>{
    try {
        const getHotel = await Hotel.findById(req.params.id)
        res.status(200).json(getHotel)
    } catch (error) {
        next(error)
    }
}


export const getAllHotels = async(req,res,next) =>{
    const {min, max, ...others} = req.query
    try {
        const hotels = await Hotel.find({
            ...others, 
            cheapestPrice:{$gt:min | 1, $lt:max || 99999}}).limit(req.query.limit)
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

export const countHotelsByCity = async(req,res,next) =>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}

export const countHotelsByType = async(req,res,next) =>{
    try {
        const hotelCount = await Hotel.countDocuments({type:"hotel"})
        const apartmentCount = await Hotel.countDocuments({type:"apartment"})
        const resortCount = await Hotel.countDocuments({type:"resort"})
        const villaCount = await Hotel.countDocuments({type:"villa"})
        const cabinCount = await Hotel.countDocuments({type:"cabin"})

        res.status(200).json([
            {type:"hotel", count:hotelCount},
            {type:"apartment", count:apartmentCount},
            {type:"resort", count:resortCount},
            {type:"villa", count:villaCount},
            {type:"cabin", count:cabinCount}
        ])
    } catch (error) {
        next(error)
    }
}