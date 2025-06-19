import { Schema } from "mongoose";

export interface TaskDocument extends Document{
    id:string;
    title:string;
    description:string;
    dueDate:Date;
    completed:boolean;
    isDeleted:boolean;
    user:Schema.Types.ObjectId;
}

export interface createTaskDocument {
        title:string;
        description:string;
        dueDate:string;
}

export interface getTaskDocument {
    page?:number;
}

export interface getTaskByIdDocument {
    taskId:string;
}

export interface updateTaskDocument {
      title?: string;
      description?: string;
      dueDate?: string;
      taskId: string;
    };