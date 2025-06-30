import mongoose, { Schema } from "mongoose";

const StorySchema = new Schema({
  translation: { type: String, required: true },
  book: { type: Number, required: true },
  chapter: { type: Number, required: true },
  verse: { type: Number, required: true },
  order_if_several: { type: Number, required: true },
  title: { type: String, required: true },
});

const StoryModel = mongoose.models.Story || mongoose.model("Story", StorySchema);

export default StoryModel;
