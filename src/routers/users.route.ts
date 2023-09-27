import { Router } from "express";
import { getOneUser, registerUser } from "../controllers/users.controller";
import { sendMailCode } from "../controllers/qrcode.controller";


const userRoute = Router();

userRoute.route("/user").post(registerUser);
userRoute.route("/user").get(getOneUser);
userRoute.route("/code").post(sendMailCode);


export default userRoute;