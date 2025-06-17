import { Router } from "express";
import { validateRequest } from "../middlewares/requestValidator";
import { createRoleSchema } from "../validators/role.validators";
import { createRole } from "../controller/role.controller";


const router = Router();

router.post("/add",validateRequest(createRoleSchema),createRole);

export default router;