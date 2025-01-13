import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    matchId: {
        type: String,
        required: true,
        unique: true
    },
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tournament"
    },
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team"
    },
    team2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "team"
    },
    date: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true,
        trim: true,
    },
    result: {
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "team",
        },
        score: {
            type: String,
            trim: true,
        }
    }
},

    { timestamps: true });

export const Match = mongoose.model("match", matchSchema);



