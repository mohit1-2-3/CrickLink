import mongoose from "mongoose";
const tournamentSchema  = new mongoose.Schema({
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
        team1: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team', 
          required: true,
        },
        team2: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Team', 
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        venue: {
          type: String,
          required: true,
        },
      },
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
  
  
   const Tournament = model('Tournament', tournamentSchema);

   export default Tournament;
  
  