import mongoose from "mongoose";

export interface Event extends mongoose.Document {
  start: number;
  duration: number;
  title: string;
}

const EventSchema = new mongoose.Schema<Event>({
  start: {
    type: Number,
    required: [true, "Please provide the start time."],
    // max: [405, "to late"],
  },
  duration: {
    type: Number,
    required: [true, "Please provide the time period"],
    // max: [405, "to long"],
  },
  title: {
    type: String,
    required: [true, "Please specify the name of the event"],
    maxlength: [200, "Еvent can not be more than 200 characters"],
  },
});

export default mongoose.models.Event ||
  mongoose.model<Event>("Event", EventSchema);
