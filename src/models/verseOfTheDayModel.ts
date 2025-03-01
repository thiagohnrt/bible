import mongoose, { Schema } from "mongoose";

export interface IVerseOfTheDay {
  _id?: string;
  book: number;
  chapter: number;
  verses: number[];
  date?: string;
  repeat?: boolean;
}

const VerseOfTheDaySchema = new Schema({
  book: { type: Number, required: true },
  chapter: { type: Number, required: true },
  verses: { type: [Number], required: true },
  date: { type: Date, required: false },
  repeat: { type: Boolean, required: false },
});

const VerseOfTheDayModel = mongoose.models.VerseOfTheDay || mongoose.model("VerseOfTheDay", VerseOfTheDaySchema);

export default VerseOfTheDayModel;
