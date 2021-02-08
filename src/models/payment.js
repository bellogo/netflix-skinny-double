import mongoose from "mongoose";

const { Schema } = mongoose;

const PaymentSchema = new Schema({
  userId: String,
  amount: Number,
  status: String,
  transactionId: String,
  subscription_Date: String,
  subscription_expiry_Date: String
});

const Payment = mongoose.model("payment", PaymentSchema);

module.exports = Payment;
