import mongoose from "mongoose";
//user_id: { type: String, unique: true, required: true },
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
    //notifications: [notificationSchema], 
  });
  export const User = mongoose.model("user",userSchema);
  