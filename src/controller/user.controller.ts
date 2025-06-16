import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup = async(req:Request,res:Response)=>{
    try{
        const {email,password} = req.validatedData as {
            email:string;
            password:string;
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User is already exist"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({email,password:hashedPassword});

        const token = jwt.sign({id:user.id,email:email},process.env.SECRET as string,{expiresIn:"24h"});
        return res.status(200).json({ message: "User created successfully.", token, user });

    }catch(err){
        console.error(err);
        return res.status(400).json({message:"Internal server Error.."})
    }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.validatedData as {
      email: string;
      password: string;
    };


    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid email..." });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET as string,
      {
        expiresIn: "24h",
      }
    );
     return res.status(200).json({ message: "Login successful.", token, user });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};