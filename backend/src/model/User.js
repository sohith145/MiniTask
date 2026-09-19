import mongoose from "mongoose";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please fill Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please fill Email"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

      password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
    },
  {
    timestamps: true,
  },
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});


userSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();

  if (update.password) {
    if (update.password.length < 6) {
      throw new AppError("Password must be at least 6 characters", 400);
    }

    update.password = await bcrypt.hash(update.password, 10);
  }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

export default User;
