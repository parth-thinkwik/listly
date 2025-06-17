import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { Permissions } from "../constants/enums";
import { RoleDocument } from "../models/roles.model";


// export const authMiddleware = async (req:Request,res:Response,next:NextFunction)=>{
//         try{
//             const token = req.headers["x-access-token"] as string;
//             if(!token){
//                 return res.status(400).json({message:"token is missing.."})
//             }
//             const decodedToken = jwt.verify(
//                 token,process.env.SECRET as string
//             ) as {id:string};

//             if(!decodedToken){
//                 return res.status(400).json({message:"User not found..."});
//             }
//             const user = await User.findOne({id:decodedToken.id});
//             if(!user){
//                 return res.status(400).json({message:"user is not exist..."})
//             }
//             req.user = user;
//             return next();
//         }catch(err){
//             console.error(err);
//             return res.status(400).json({ message: "User is not authenticated, please signup first" });
// }
// }

export const authMiddleware = (requiredPermissions?:Permissions)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
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
            const user = await User.findOne({id:decodedToken.id}).populate({
                path:"roleIds",
                model:"Role",
                localField:"roleIds",
                foreignField:"id"
            });
            // const user = await User.findOne({id:decodedToken.id});
            if(!user){
                return res.status(400).json({message:"user is not exist..."})
            }

              if (!requiredPermissions || requiredPermissions.length === 0) {
                req.user = user;
                return next();
                }
            const roles = user.roleIds as RoleDocument[];
            console.log(roles);
            
            if(!user.roleIds || !Array.isArray(user.roleIds)){
                return res.status(400).json({message:"user has no role assigned..."})
            }
            
         const hasPermission = roles.some(role =>
           role.permissions.some(perm => requiredPermissions.includes(perm))
            );
            if(!hasPermission){
                return res.status(400).json({message:"user don't have the permission to this.."})
            }
            req.user = user;
            return next();
        }catch(err){
            console.error(err);
            return res.status(400).json({ message: "User is not authenticated, please signup first" });
}
}

}