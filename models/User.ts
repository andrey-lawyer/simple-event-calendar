import mongoose from "mongoose";

export interface User extends mongoose.Document {
  email: string;
  password: string;
  events: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: [true, "Please provide the email."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide the password."],
  },
});

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
