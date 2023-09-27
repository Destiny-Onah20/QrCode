"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_schema_1 = __importDefault(require("../schemas/users.schema"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        yield users_schema_1.default.validateAsync({ name, email, password });
        const checkEmail = yield user_model_1.default.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({
                message: "Email already taken!"
            });
        }
        ;
        const saltPass = yield bcryptjs_1.default.genSalt(10);
        yield bcryptjs_1.default.hash(password, saltPass, (err, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(400).json({
                    message: err.message
                });
            }
            else {
                ;
                const userData = {
                    name,
                    email,
                    password: result
                };
                const newUser = new user_model_1.default(userData);
                const generateToken = jsonwebtoken_1.default.sign({
                    _id: newUser._id,
                    name: newUser.name
                }, process.env.SALT_SECT, {
                    expiresIn: "1d"
                });
                newUser.token = generateToken;
                yield newUser.save();
                return res.status(201).json({
                    message: "Success!",
                    data: generateToken
                });
            }
        }));
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 'Failed!'
        });
    }
});
exports.registerUser = registerUser;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const theUser = yield user_model_1.default.find(query);
        res.status(200).json({
            message: "Success",
            data: theUser
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 'Failed!'
        });
    }
});
exports.getOneUser = getOneUser;
