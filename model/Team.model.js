import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: { 
    type: String, required: true 
  }, 
  captainId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true 
  }, 
  players: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: "User" 
  }], 
  registeredTournaments: [{ 
    type: mongoose.Schema.Types.ObjectId, ref: "Tournament" 
  }], 
  wins: { type: Number, default: 0 }, 
  losses: { type: Number, default: 0 }, 
});

// Check if model exists before defining it
const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export { Team };
