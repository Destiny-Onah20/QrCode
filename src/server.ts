import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routers/users.route";
dotenv.config();
import exphbs from 'nodemailer-express-handlebars';
import fileUpload from "express-fileupload";


const app = express();

const port = 9999;

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use("/api", userRoute)

app.use(fileUpload({
  useTempFiles: true
}));
app.set('view engine', 'handlebars');





const database = <string>process.env.DATABASE_URL;

mongoose.connect(database).then(() => {
  console.log("Database connection Success!");
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
  })
}).catch((error) => {
  console.log(error.message);

})


