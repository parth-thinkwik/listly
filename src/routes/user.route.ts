import { Router } from "express";
import { login, signup } from "../controller/user.controller";
import { validateRequest } from "../middlewares/requestValidator";
import { userSchema } from "../validators/user.validator";


const router = Router();

router.post("/signup",validateRequest(userSchema),signup);
router.get("/login",validateRequest(userSchema),login);
// router.get("/userList")

export default router;  