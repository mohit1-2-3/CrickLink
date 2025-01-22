import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  type: {type: String, required: true },

  receiverId : {type: mongoose.Schema.Types.ObjectId, ref: "User" },
  senderId : {type: mongoose.Schema.Types.ObjectId, ref: "User"},

  message: { type: String, required: true},
  status: {type: String, enum: ["pending", "accepted", "rejected"],
  default:"pending"},
  });


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    contect:{ type: String, required: true },           
    role: { type: String, enum: ["player", "captain", "organizer"], default: "player"}, 
    profile: {
      skills: { type: String }, 
      experience: { type: Number, default: 0 }, 
      location: { type: String }, 
    },
    profile_photo: { type: String }, 
    notifications: [notificationSchema], 
  });
  export const User = mongoose.model("user",userSchema);