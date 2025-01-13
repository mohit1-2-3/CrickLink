import mongoose from "mongoose";
const tournamentSchema = new mongoose.Schema({
  TournamentName: {
    type: String,
    required: true,
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
  ],
  schedule: [
    {
      matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match',
        required: true,
      },
    }
  ],
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});


export const Tournament = mongoose.model('Tournament', tournamentSchema);

 
  
