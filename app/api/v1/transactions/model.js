const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    personalDetail: {
      firstName: {
        type: String,
        required: [true, "Please provide firstname"],
        minlength: 3,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: [true, "Please provide lastName"],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, "Please provide email"],
      },
      role: {
        type: String,
        default: "Designer",
      },
    },

    participant: {
      type: mongoose.Types.ObjectId,
      ref: "Participant",
      required: true,
    },
    event: {
      type: mongoose.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    historyEvent: {
      title: {
        type: String,
        required: [true, "please provide title"],
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
    },

    payment: {
      type: mongoose.Types.ObjectId,
      ref: "Payment",
      required: true,
    },

    historyPayment: {
      type: {
        type: String,
        required: [true, "please provide type"],
      },
      imageUrl: {
        type: String,
        required: [true, "please provide imageUrl"],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
