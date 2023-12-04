import mongoose from "mongoose";
const { Schema } = mongoose;

const eventSchema = new Schema({
  writer: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
