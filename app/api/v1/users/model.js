const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "please provide email"],
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["super-admin", "admin"],
      default: "super-admin",
    },
  },
  { timestamps: true }
);

UserSchema.path("email").validate(
  function (value) {
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
  },

  (attr) => `${attr.value} harus merupakan email yang valid`
);

UserSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("User").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = async function (caditatePassword) {
  const isMatch = await bcrypt.compare(caditatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
