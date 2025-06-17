import { Request,Response } from "express";
import { Role, RoleDocument } from "../models/roles.model";
import { User } from "../models/user.model";
import { Task } from "../models/task.model";
import { findUserwithTaskDetailsSchema } from "../types/admin.types";
import { TaskDocument } from "../types/task.types";

export const listUsers = async(req:Request,res:Response)=>{
    try{
      const user = req.user;
      
      const roles = user.roleIds as RoleDocument[];
        
       const isAdmin = roles.some((role) => role.name === 'Admin');
        
    if (!isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
        const users = await User.find();
        const userWithTaskCount =  await Promise.all(
          users.map(async (user)=>{
           const count = await Task.countDocuments({user:user.id,isDeleted:false});
           return {
            userId:user.id,
            email:user.email,
            taskCount:count
           }
        }))
        return res.status(200).json({statusCode:200,message:"ok",data:userWithTaskCount});
      
    }catch(err){  
      console.error(err);
      return res.status(500).json({
                "statusCode": 500,
                "message": "Internal server error",
                "error": "Cannot read properties of undefined (reading 'roleIds')"
        })
    }
}

export const listUserById = async(req:Request,res:Response)=>{
    try{
        const user = req.user;
        const {userId} = req.validatedData as findUserwithTaskDetailsSchema;

        const roles = user.roleIds as RoleDocument[];
        const isAdmin = roles.some((role)=>role.name === 'Admin');
        if(!isAdmin){
            return res.status(400).json({StatusCode: 400,message:"Access Denied. Admins only"});
        }
        const tasks = await Task.find({user:userId,isDeleted:false}) as TaskDocument[];
        console.log(tasks);
        
        const userTasks = {
            userId:userId,
            email:user.email,
            tasks:tasks
        }
        return res.status(200).json({StatusCode:200,message:"ok",data:userTasks})
    }catch(err){
        console.error(err);
         return res.status(500).json({
                "statusCode": 500,
                "message": "Internal server error",
                "error": "Cannot read properties of undefined (reading 'roleIds')"
        })
    }
}