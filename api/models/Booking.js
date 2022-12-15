import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
    user:{
        type: String,
        required:true
    },
    hotel:{
        name:{
            type: String,
            required:true
        },
        id:{
            type: String,
            required:true
        }
    },
    rooms:{
        type: [String],
        required:true
    },
    dates:{
        type: [Date],
        required:true
    }
},{timestamps: true})

export default mongoose.model("Booking", BookingSchema)