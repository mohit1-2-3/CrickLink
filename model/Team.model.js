import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String, required: true
  },
  captainId:
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  players: [{
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  }],
  wins:
    { type: Number, default: 0 },
  losses:
    { type: Number, default: 0 },
});

const Team = mongoose.model("Team", teamSchema);
export default Team;
