import jwt from "jsonwebtoken";


export const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token
    if(!token){
        throw new Error("You are not authenticated!")
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err){
            throw new Error("Token is not valid!")
        } else{
            req.user = user
            next()
        }
       
    })
}

export const verifyUser = (req,res,next) => {
    verifyToken(req,res, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin || req.params.userid){
            next()
        }else{
            throw new Error("You are not authorized!")
        }
    })
}

export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,next, () =>{
        if(req.user.isAdmin === true){
            next()
        }else{
            throw new Error("You are not authorized!")
        }
    })
}