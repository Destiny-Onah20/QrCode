"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_route_1 = __importDefault(require("./routers/users.route"));
dotenv_1.default.config();
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
const port = 9999;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use("/api", users_route_1.default);
app.use((0, express_fileupload_1.default)({
    useTempFiles: true
}));
app.set('view engine', 'handlebars');
const database = process.env.DATABASE_URL;
mongoose_1.default.connect(database).then(() => {
    console.log("Database connection Success!");
}).then(() => {
    app.listen(port, () => {
        console.log(`Listening to port: ${port}`);
    });
}).catch((error) => {
    console.log(error.message);
});
