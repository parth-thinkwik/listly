import { Request, Response } from "express";
import { Role, RoleDocument } from "../models/roles.model";
import { assignRoleSchema, createRoleSchema, editRoleSchema } from "../types/role.types";
import { User } from "../models/user.model";

export const createRole = async(req:Request,res:Response)=>{
    try{
        const {name,permissions} = req.validatedData as createRoleSchema;
        const existingRole = await Role.find({name});
        const matchedRoles = existingRole.find((role)=>{
            const dbPermissions = [...role.permissions].sort().join(",");
            const inputPermissions = [...permissions].sort().join(",");
            return dbPermissions === inputPermissions
        })
        if(matchedRoles){
            return res.status(400).json({statusCode:400,message:"role is already exist can you please create it with another role name"})
        }
        const role = await Role.create({
            name:name,
            permissions:permissions
        }) as RoleDocument;
        
        return res.status(200).json({message:"role created successfully...",role})
    }catch(err){
        console.error(err);
      return res.status(500).json({
                "statusCode": 500,
                "message": "Internal server error",
        })
    }
}

export const assignRole = async(req:Request,res:Response)=>{
    try{
        const {userId,roleIds} = req.validatedData as assignRoleSchema;
        const user = await User.findOne({id:userId});
        if(!user){
            return res.status(400).json({statusCode:400,message:"User Not found!"})
        }
        const validRoleIds = await Role.find({id:{$in:roleIds}});
        if(roleIds.length !== validRoleIds.length){
            return res.status(400).json({statusCode:400,message:"one or more roleIds are invalid"});
        }
        const updatedRoleIds = Array.from(new Set([...user.roleIds,...roleIds])) as string[];
        user.roleIds = updatedRoleIds;
        await user.save();

        return res.status(200).json({statusCode:200,message:"ok",data:{
            id:user.id,
            email:user.email,
            roleIds:user.roleIds
        }})
    }catch(err){
        console.error(err);
      return res.status(500).json({
                "statusCode": 500,
                "message": "Internal server error",
        });
    }
}

export const editRole = async(req:Request,res:Response)=>{
    try{
        const {roleId,name,permissions} = req.validatedData as editRoleSchema;
        const existingRole = await Role.findOne({id:roleId});

        if(!existingRole){
            return res.status(400).json({statusCode:400,message:"couldn't find the role.."})
        }
         if(name) existingRole.name = name;
         if(permissions) existingRole.permissions = permissions;

        await existingRole.save();
        return res.status(200).json({statusCode:200,message:"Role Updated successfully...",data:{
            id:existingRole.id,
            name:existingRole.name,
            permissions:existingRole.permissions
        }})

    }catch(err){
        console.error(err);
      return res.status(500).json({
                "statusCode": 500,
                "message": "Internal server error"
        });
    }
}

export const listRoles = async ( req:Request,res: Response) => {
    try {
        const user = req.user
        console.log(user);
        
        const roles = await Role.find({});
        
        return res.status(200).json({
            statusCode: 200,
            message: "ok",
            data: roles
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            "statusCode": 500,
            "message": "Internal server error"
});
    }
};