import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
  TournamentName: {
    type: String,
    required: true,
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  teams: [
    {
      teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
      }
    }
  ],
  schedule: [
    {
      matchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'match',
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


const Tournament = mongoose.model('Tournament', tournamentSchema);

export default Tournament;

