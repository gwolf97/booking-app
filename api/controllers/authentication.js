import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async(req,res,next) =>{
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save()

        res.status(200).send("User has been created")
    } catch (error) {
        next(error)
    }
}


export const login = async(req,res,next) =>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) throw new Error("User not found")
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) throw new Error("password or username incorrect")

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY)

        const {password, isAdmin, ...otherDetails} = user._doc

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({details: {...otherDetails}, isAdmin})
    } catch (error) {
        next(error)
    }
}
