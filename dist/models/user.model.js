"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: [true, "This field is required! "]
    },
    email: {
        type: String,
        require: [true, "This field is required! "],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: [true, "This field is required! "]
    },
    token: {
        type: String
    }
}, {
    timestamps: true
});
const Users = mongoose_1.default.model("users", userSchema);
exports.default = Users;
