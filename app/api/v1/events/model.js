const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide title"],
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: [true, "Please Provide date"],
    },
    cover: {
      type: String,
      // required: [true, "please provide cover"],
    },
    about: {
      type: String,
      required: [true, "please provide about"],
    },
    venueName: {
      type: String,
      required: [true, "Please provide venue name"],
    },
    tagline: {
      type: String,
      required: [true, "please provide ragline"],
    },
    keyPoint: {
      type: [String],
      // required: [true, "please provide key point"],
    },

    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    speaker: {
      type: mongoose.Types.ObjectId,
      ref: "Speaker",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
