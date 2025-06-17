import { Router } from "express";
import { listUserById, listUsers } from "../controller/admin.controller";
import { authMiddleware } from "../middlewares/is-Auth";
import { validateRequest } from "../middlewares/requestValidator";
import { getAdminQuerySchema } from "../validators/admin.validators";


const router = Router();

router.get("/listUsers",authMiddleware(),listUsers);
router.get("/listUsersById/:userId",authMiddleware(),validateRequest(getAdminQuerySchema),listUserById);

export default router;