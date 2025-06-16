import { model, Schema } from "mongoose";
import {v4 as uuidv4} from "uuid";


export interface TaskDocument extends Document{
    id:string;
    title:string;
    description:string;
    dueDate:Date;
    completed:boolean;
    isDeleted:boolean;
    uuser:Schema.Types.ObjectId;
}

const taskSchema = new Schema({
    id:{
        type:String,
        default:uuidv4  
    },
    title:{
        type:String,
        required:true,
        default:""
    },
    description:{
        type:String,
        required:true,
        default:""
    },
    dueDate:{
        type:Date,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    user:{
        type:String,
        ref:"User",
        required:true
    }
})

export const Task = model<TaskDocument>("Task",taskSchema);