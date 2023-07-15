import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      trim: true,
    },
    place: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      default: 0,
    },
    rate: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("user", productSchema);
