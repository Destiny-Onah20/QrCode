import nodemailer from "nodemailer";
import dotenv from "dotenv";
import smtpTransport from "nodemailer-smtp-transport";
import nodemailerExpressHandlebars from 'nodemailer-express-handlebars';
import path from 'path';
import fs from "fs";
dotenv.config();

export interface mailInterface {
  email: string;
  subject: string;
  from: {
    name?: string,
    address: string | undefined
  },
  message: string;
  html: string;
}

export default class mailSender {
  private static instance: mailSender
  private transporter!: nodemailer.Transporter

  static getInstance() {
    if (!mailSender.instance) {
      mailSender.instance = new mailSender()
    }
    return mailSender.instance
  };
  // public emailTemplate = fs.readFileSync('email.handlebars', 'utf8');
  // public handlebarsOptions = {
  //   viewEngine: {
  //     extName: '.handlebars',
  //     partialsDir: path.resolve(__dirname, 'views', 'partials'),
  //     layoutsDir: path.resolve(__dirname, 'views', 'layouts'),
  //     defaultLayout: this.emailTemplate,
  //   },
  //   viewPath: path.resolve(__dirname, 'views'),
  //   extName: '.handlebars',
  // };

  async createConnection() {
    this.transporter = nodemailer.createTransport(smtpTransport({
      service: process.env.SERVICE,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    }))
    try {
      await this.transporter.verify();
      // console.log("MailSender connection established successfully.");
    } catch (error) {
      // console.error("Error establishing MailSender connection:", error);
    }
  };
  async mail(Option: mailInterface) {
    const mailOption = {
      from: {
        name: "Room",
        address: <string>process.env.EMAIL
      },
      to: Option.email,
      subject: Option.subject,
      text: Option.message,
      html: Option.html
    }

    // this.transporter.use('compile', nodemailerExpressHandlebars(this.handlebarsOptions));
    await this.transporter.sendMail(mailOption);

  }
  getTransporter() {
    return this.transporter;
  }
}


