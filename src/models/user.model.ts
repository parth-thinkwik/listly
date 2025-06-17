import { model, Schema, Types } from "mongoose";
import{v4 as uuidv4} from "uuid";
import { UserDocument } from "../types/user.types";

const userSchema = new Schema<UserDocument>({
    id:{
        type:String,
        default:uuidv4
    },
    email:{
        type:String,
        unique:true,
        required:true,
        default:""
    },
    password:{
        type:String,
        required:true,
        default:""
    },
    roleIds:[
        {
            type:String,
            ref:"Role"
        }
    ]  
},{
    timestamps:true
}
)

export const User = model<UserDocument>("User",userSchema);