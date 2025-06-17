import { Router } from "express";
import { authMiddleware } from "../middlewares/is-Auth";
import { validateRequest } from "../middlewares/requestValidator";
import { createTaskSchema, getTaskQuerySchema, updateTaskSchema, } from "../validators/task.validadtors";
import { createTask, deleteTask, getTask, getTaskById, updateTask } from "../controller/task.controller";
import { Permissions } from "../constants/enums";

const router = Router();

router.post("/addTask",authMiddleware(Permissions.ADDTASK),validateRequest(createTaskSchema),createTask);
router.get("/getTaskItems",authMiddleware(Permissions.LISTNG),validateRequest(getTaskQuerySchema),getTask);
router.get("/:taskId",authMiddleware(Permissions.TASKDETAILS),validateRequest(updateTaskSchema),getTaskById);
router.post("/update/:taskId",authMiddleware(Permissions.EDITASK),validateRequest(updateTaskSchema),updateTask);
router.post("/delete/:taskId",authMiddleware(Permissions.REMOVETASK),validateRequest(updateTaskSchema),deleteTask);

export default router;