import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    requests: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserRequest",
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", userSchema);
