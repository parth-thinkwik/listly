import { Router } from "express";
import { listUserById, listUsers } from "../controller/admin.controller";
import { authMiddleware } from "../middlewares/is-Auth";
import { validateRequest } from "../middlewares/requestValidator";
import { getAdminQuerySchema } from "../validators/admin.validators";
import { Permissions } from "../constants/enums";


const router = Router();

router.get("/listUsers",authMiddleware(Permissions.LISTUSERS),listUsers);
router.get("/listUsersById/:userId",authMiddleware(Permissions.LISTUSERBYID),validateRequest(getAdminQuerySchema),listUserById);

export default router;