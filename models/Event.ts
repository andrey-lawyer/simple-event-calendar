import mongoose from "mongoose";

export interface Event extends mongoose.Document {
  start: number;
  duration: number;
  title: string;
  user: mongoose.Types.ObjectId;
}

const EventSchema = new mongoose.Schema<Event>({
  start: {
    type: Number,
    required: [true, "Please provide the start time."],
  },
  duration: {
    type: Number,
    required: [true, "Please provide the time period"],
  },
  title: {
    type: String,
    required: [true, "Please specify the name of the event"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.models.Event ||
  mongoose.model<Event>("Event", EventSchema);
