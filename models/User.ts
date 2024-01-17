import mongoose from "mongoose";

export interface User extends mongoose.Document {
  email: string;
  name: string;
  events: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "Please provide the name."],
    maxlength: [100, "Name can not be more than 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide the email."],
    unique: true, // Кожен користувач має унікальний email
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
