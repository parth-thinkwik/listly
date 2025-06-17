import { Request, Response } from "express";
import moment from "moment";
import { Task } from "../models/task.model";
import { createTaskDocument, getTaskByIdDocument, getTaskDocument, updateTaskDocument } from "../types/task.types";

export const createTask = async(req:Request,res:Response)=>{
  try{
      const {title,description,dueDate} = req.validatedData as createTaskDocument;
    const user = req.user;
    const dueDateMoment = moment(dueDate).startOf("day"); 
    const now = moment().startOf("day");

    if(dueDateMoment.isBefore(now)){
        return res.status(400).json({message:"please don't enter past due date.."})
    }
    const taskItem = {title,description,dueDate:dueDateMoment,user: user ?.id};
    const createdItem = await Task.create(taskItem);
    return res.status(200).json({message:"Task created successfully..",createdItem});
  }catch(err){
    console.error(err);
    return res.status(500).json({message:"Intternal server Error..."})      
  }
}

export const getTask = async(req:Request,res:Response)=>{
    try{
        const user = req.user;
        
        const {page = 1} = req.validatedData as getTaskDocument;
        const limit = 5;
        const skip = (page - 1) * limit;

        const taskItems = await Task.find({user:user?.id,isDeleted:false}).skip(skip).limit(limit);
        console.log(taskItems);
        
        
        return res.status(200).json({message:"Task items founded successfully...",taskItems,pagination:{currentPage:page,totalItems: await Task.countDocuments({user:user?.id}),totalPages:Math.ceil((await Task.countDocuments({user:user?.id}))/limit)}});

    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server Error..."});    
    }
}

export const getTaskById = async(req:Request,res:Response)=>{
  try{
    const user = req.user;
    const {taskId} = req.validatedData as getTaskByIdDocument

    const item = await Task.find({id:taskId,user:user?.id,isDeleted:false});
    if(item.length == 0){
      return res.status(500).json({message:"Task not found!"});
    }
     return res.status(200).json({
      message: "Task item retrieved successfully.",
      item,
    });
  }catch(err){
    console.error(err);
    return res.status(500).json({message:"Internal server Error"});
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId, title, description, dueDate } = req.validatedData as updateTaskDocument;

    const user = req.user;
    const task = await Task.findOne({ id: taskId, user: user?.id, isDeleted: false });

    if (!task) {
      return res.status(400).json({ message: "Task not found..." });
    }

    if (dueDate) {
      const updatedDueDate = moment(dueDate).startOf("day");
      const now = moment().startOf("day");

      if (updatedDueDate.isBefore(now)) {
        return res.status(400).json({ message: "Please don't enter a past due date." });
      }

      task.dueDate = updatedDueDate.toDate();
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;

    const updatedTask = await task.save();

    return res.status(200).json({
      message: "Task updated successfully",
      task: {
        id: updatedTask.id,
        title: updatedTask.title,
        description: updatedTask.description,
        dueDate: updatedTask.dueDate, 
            }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};


export const deleteTask = async(req:Request,res:Response)=>{
  try{
    const user = req.user;
    const{taskId} = req.validatedData as getTaskByIdDocument;

    const task = await Task.findOne({id:taskId,user:user?.id});
    
    if(!task){
      return res.status(400).json({message:"task nott found..."});
    }
    task.isDeleted = true;
    await task.save();
    return res.status(200).json({message:"task deleted suuccessfully...",task})
  }catch(err){
    console.error(err);
    return res.status(500).json({message:"Internal server Error..."})
  }
}