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

export type createTaskDocument = {
        title:string;
        description:string;
        dueDate:string;
}

export type getTaskDocument = {
    page?:number;
}

export type getTaskByIdDocument= {
    taskId:string;
}

export type updateTaskDocument = {
      title?: string;
      description?: string;
      dueDate?: string;
      taskId: string;
    };