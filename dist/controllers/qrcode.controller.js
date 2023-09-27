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
exports.sendMailCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const mail_1 = __importDefault(require("../middlewares/mail"));
const qrcode_model_1 = __importDefault(require("../models/qrcode.model"));
const cloudinary_1 = __importDefault(require("../middlewares/cloudinary"));
const sendMailCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name } = req.body;
        // const qrPath = '../uploads';
        // const emailCheck = await QrCodeShema.findOne({ email });
        // if (emailCheck) {
        //   return res.status(400).json({
        //     message: "Already scanned this ticket!"
        //   })
        // }
        const qrImage = yield qrcode_1.default.toDataURL(email);
        // console.log(qrImage);
        // Convert the data URL to a buffer
        const qrCodeString = qrImage.split(',')[1];
        // console.log(qrCodeString);
        // Upload the QR code image to Cloudinary
        const result = yield cloudinary_1.default.uploader.upload(qrImage, {
            folder: 'qr_codes',
            public_id: 'my_qr_code', // Specify a public_id for the image (optional)
        });
        const image = result.secure_url;
        const mailservice = new mail_1.default();
        mailservice.createConnection();
        mailservice.mail({
            from: {
                address: process.env.EMAIL
            },
            email: email,
            subject: "Ticket QR Code!",
            message: "emailText",
            html: `<
  
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Event Ticket with QR Code</title>
          </head>
          <body>
              <h1>Welcome to Your Event Booking App</h1>
              <p>Hello ${name} </p>
              <p>Your event ticket is attached as a QR code:</p>
              <!-- Display the QR code image -->
              <img src="data:image/png;base64, ${image} " alt="QR Code" width="200" height="200">
              <p>To access your event ticket, scan the QR code above.</p>
              <p>If you have any questions, please feel free to contact us.</p>
          </body>
          </html>
          `
        });
        yield qrcode_model_1.default.create({ email, name });
        return res.status(201).json({
            message: "Success check your email😇✅"
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 'Failed!'
        });
    }
});
exports.sendMailCode = sendMailCode;
