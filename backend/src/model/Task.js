import mongoose from "mongoose";
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a task title"],
      trim: true,
      minlength: 3,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      minlength: 3,
    },
    priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
      },
    dueDate: {
    type: Date
      },
       estimatedHours: {
     type: Number
},
owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",      
    required: true
  },
  },
  {
    timestamps: true 
  },
);
taskSchema.index({ priority: 1 });
taskSchema.index({ priority: 1,completed: 1 });
const Task = mongoose.model("Task", taskSchema);

export default Task;
