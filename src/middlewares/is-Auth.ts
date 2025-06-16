import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";


export const authMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const token = req.headers["x-access-token"] as string;
            if(!token){
                return res.status(400).json({message:"token is missing.."})
            }
            const decodedToken = jwt.verify(
                token,process.env.SECRET as string
            ) as {id:string};

            if(!decodedToken){
                return res.status(400).json({message:"User not found..."});
            }
            const user = await User.findOne({id:decodedToken.id});
            if(!user){
                return res.status(400).json({message:"user is not exist..."})
            }
            req.user = user;
            return next();
        }catch(err){
            console.error(err);
            return res.status(400).json({ message: "User is not authenticated, please signup first" });
}
}