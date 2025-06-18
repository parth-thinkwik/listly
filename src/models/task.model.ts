import { model, Schema } from "mongoose";
import {v4 as uuidv4} from "uuid";
import { TaskDocument } from "../types/task.types";

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
    },
    attachment:{
        type:String,
        required: false
    }
})

export const Task = model<TaskDocument>("Task",taskSchema);