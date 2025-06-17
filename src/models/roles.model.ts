import { model, Schema } from "mongoose";
import {v4 as uuidv4} from "uuid";
import { Permissions } from "../constants/enums";


export interface RoleDocument extends Document{
    id:string;
    name:string;
    permissions:string[]
}

const roleSchema = new Schema({
    id: {
        type:String,
        default:uuidv4,
        required:true,
    },
    name:{
        type:String,
        unique:true,
        default:"",
        required:true
    },
    permissions: [{type:String,enum:Object.values(Permissions)}]
})

export const Role = model<RoleDocument>("Role",roleSchema);