import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  feedback: String,
  stars: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
