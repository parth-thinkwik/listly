import { model, Schema } from "mongoose";
import{v4 as uuidv4} from "uuid";

export interface UserDocument{
    id:string;
    email:string;
    password:string;
}

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
    }
},{
    timestamps:true
}
)

export const User = model<UserDocument>("User",userSchema);