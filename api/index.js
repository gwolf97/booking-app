import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import {fileURLToPath} from "url"
const app = express()
dotenv.config()

const __filename = fileURLToPath(import.meta.url);

const _dirname = path.dirname(__filename)

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to mongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!")
})

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use("/auth", authRoute)
app.use("/users", usersRoute)
app.use("/hotels", hotelsRoute)
app.use("/rooms", roomsRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})

app.use(express.static(path.join(_dirname, "../client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.resolve(_dirname, "../client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connect()
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})