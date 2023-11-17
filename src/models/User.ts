import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
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

    arrived_info: {
      firstname: String,
      lastname: String,
      country: {},
      address: String,
      city: String,
      state: String,
      postal_code: String,
      phone: String,
    },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", userSchema);
