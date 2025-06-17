import { Request, Response } from "express";
import { Role, RoleDocument } from "../models/roles.model";

export const createRole = async(req:Request,res:Response)=>{
    try{
        const {name,permissions} = req.validatedData as {
            name:string,
            permissions:string[]
        }
        const existingRole = await Role.find({name});
        const matchedRoles = existingRole.find((role)=>{
            const dbPermissions = [...role.permissions].sort().join(",");
            const inputPermissions = [...permissions].sort().join(",");
            return dbPermissions === inputPermissions
        })
        if(matchedRoles){
            return res.status(400).json({message:"role is already exist can you please create it with another role name"})
        }
        const role = await Role.create({
            name:name,
            permissions:permissions
        }) as RoleDocument;
        
        return res.status(200).json({message:"role created successfully...",role})
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server Error"});
    }
}
