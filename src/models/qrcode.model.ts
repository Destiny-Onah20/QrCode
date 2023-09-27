import mongoose from "mongoose";
import { Document } from "mongoose";

interface QrCode extends Document {
  email: string,
  name: string,
  qrcode: string,
  image: string
}
const qrcodeSchema = new mongoose.Schema({
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

const QrCodeShema = mongoose.model<QrCode>("qrcode", qrcodeSchema);

export default QrCodeShema;