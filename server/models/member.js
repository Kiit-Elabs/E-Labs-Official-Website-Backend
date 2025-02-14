import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  designation: {
    type: String,
    enum: [
      "Coordinator",
      "Assistant Coordinator",
      "Lead",
      "Assistant Team Lead",
      "Member",
    ],
    required: true,
  },
  priority: {
    type: Number,
    enum: [5, 4, 3, 2, 1],
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: false,
  },
  github: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
});

const MongooseSchema = mongoose.model("Member", memberSchema);
export default MongooseSchema;
