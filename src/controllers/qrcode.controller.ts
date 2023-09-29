import qrCode from "qrcode";
import fs from "fs";
import { RequestHandler } from "express";
import { Content } from "mailgen";
import generateMail from "../middlewares/genTemplate";
import mailSender from "../middlewares/mail";
import QrCodeShema from "../models/qrcode.model";
import Cloudinary from "../middlewares/cloudinary";
import e from "express-fileupload";


export const sendMailCode: RequestHandler = async (req, res) => {
  try {
    const { email, name } = req.body;

    // const qrPath = '../uploads';

    // const emailCheck = await QrCodeShema.findOne({ email });

    // if (emailCheck) {
    //   return res.status(400).json({
    //     message: "Already scanned this ticket!"
    //   })
    // }

    const qrImage = await qrCode.toDataURL(email);
    // console.log(qrImage);

    // Convert the data URL to a buffer
    const qrCodeString = qrImage.split(',')[1];

    // console.log(qrCodeString);

    // Upload the QR code image to Cloudinary
    const result = await Cloudinary.uploader.upload(qrImage, {
      folder: 'qr_codes', // Specify a folder in Cloudinary (optional)
      public_id: 'my_qr_code', // Specify a public_id for the image (optional)
    }
    );
    const image = result.secure_url
    const mailservice = new mailSender();
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
              <img src="${image}" alt="QR Code" width="200" height="200">
              <p>To access your event ticket, scan the QR code above.</p>
              <p>If you have any questions, please feel free to contact us.</p>
          </body>
          </html>
          `
    });

    await QrCodeShema.create({ email, name });

    return res.status(201).json({
      message: "Success check your email😇✅"
    })


  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
      status: 'Failed!'
    })
  }
}

