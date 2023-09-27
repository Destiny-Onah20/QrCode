"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const qrcode_controller_1 = require("../controllers/qrcode.controller");
const userRoute = (0, express_1.Router)();
userRoute.route("/user").post(users_controller_1.registerUser);
userRoute.route("/user").get(users_controller_1.getOneUser);
userRoute.route("/code").post(qrcode_controller_1.sendMailCode);
exports.default = userRoute;