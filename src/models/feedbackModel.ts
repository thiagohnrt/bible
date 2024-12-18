import mongoose, { Schema } from "mongoose";

const FeedbackSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  typeMsg: { type: String, required: true },
  userAgent: { type: String, required: true },
  datatime: { type: Date, default: Date.now },
});

const FeedbackModel = mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);

export default FeedbackModel;
