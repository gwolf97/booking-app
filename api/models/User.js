import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    country:{
        type: String,
        required:true
    },
    img:{
        type: String,
        default:"https://i.ibb.co/MBtjqXQ/no-avatar.gif"
    },
    city:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    bookings:{
        type: [String],
        default: []
    },
    isAdmin:{
        type: Boolean,
        default: false,
    }
},{timestamps: true})

export default mongoose.model("User", UserSchema)