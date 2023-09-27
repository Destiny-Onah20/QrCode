"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const qrcodeSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        require: [true, "this field is required!"],
        trim: true,
    },
    name: {
        type: String,
        require: [true, "this field is required!"],
    },
    qrcode: {
        type: String,
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});
const QrCodeShema = mongoose_1.default.model("qrcode", qrcodeSchema);
exports.default = QrCodeShema;
