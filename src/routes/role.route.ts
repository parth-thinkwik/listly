import { Router } from "express";
import { validateRequest } from "../middlewares/requestValidator";
import { assignRoleSchema, createRoleSchema, editRoleSchema } from "../validators/role.validators";
import { assignRole, createRole, editRole, listRoles } from "../controller/role.controller";
import { authMiddleware } from "../middlewares/is-Auth";
import { Permissions } from "../constants/enums";


const router = Router();

router.post("/add",authMiddleware(Permissions.CREATEROLE),validateRequest(createRoleSchema),createRole);
router.post("/assign/:userId",authMiddleware(Permissions.ASSIGNROLE),validateRequest(assignRoleSchema),assignRole);
router.post("/edit/:roleId",authMiddleware(Permissions.EDITROLE),validateRequest(editRoleSchema),editRole);
router.get("/list",authMiddleware(Permissions.LISTROLE),listRoles);

export default router;