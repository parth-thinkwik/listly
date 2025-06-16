import { Router } from "express";
import { authMiddleware } from "../middlewares/is-Auth";
import { validateRequest } from "../middlewares/requestValidator";
import { createTaskSchema, getTaskQuerySchema, updateTaskSchema, } from "../validators/task.validadtors";
import { createTask, deleteTask, getTask, getTaskById, updateTask } from "../controller/task.controller";

const router = Router();

router.post("/addTask",authMiddleware,validateRequest(createTaskSchema),createTask);
router.get("/getTaskItems",authMiddleware,validateRequest(getTaskQuerySchema),getTask);
router.get("/:taskId",authMiddleware,validateRequest(updateTaskSchema),getTaskById);
router.post("/update/:taskId",authMiddleware,validateRequest(updateTaskSchema),updateTask);
router.post("/delete/:taskId",authMiddleware,validateRequest(updateTaskSchema),deleteTask);

export default router;