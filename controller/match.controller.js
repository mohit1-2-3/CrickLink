import { request, response } from "express";
import { Match } from "../model/match.model.js";
import Tournament from "../model/tournament.model.js";
import { Team } from "../model/Team.model.js";

// ---------------create match------------------------------

export const createMatches = async (request, response, next) => {
    console.log("entered...")
    let { team1_name, team2_name } = request.body;
    let team1 = await Team.findOne({ teamName: team1_name });
    let team2 = await Team.findOne({ teamName: team2_name });
    console.log("teams : " + team1 + " " + team2);
    request.body.team1 = team1._id;
    request.body.team2 = team2._id;
    console.log("team ids : " + request.body.team1 + " " + request.body.team2)
    request.body.date = request.body.date.split('T')[0];

    try {
        const result = await Match.create(request.body);
        if (result) {
            return response.status(200).json({ message: "Match schedule successfully" });
        }
        else {
            return response.status(400).json({ error: "bad error" });
        }
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ erroe: "internal server error" });
    }
};

// -----------------------view match--------------------------------

export const viewMatches = async (request, response, next) => {
    try {
        const result = await Match.find()
            .populate("tournamentId", "TournamentName")
            .populate("team1", "teamName")
            .populate("team2", "teamName");
        return response.status(200).json({ Match: result });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error" });
    }
};


// -------------------view matches with tournament id---------------------

export const tournamentMatch = async (request, response, next) => {
    try {
        const id = request.params.id;
        const result = await Match.findOne({ id })
            .populate("tournamentId", "TournamentName")
            .populate("team1", "teamName")
            .populate("team2", "teamName");

        console.log(result);
        if (result) {
            return response.status(200).json({ Match: result });
        }
        return response.status(404).json({ error: "not found" });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error" });
    }
};


// --------------------------update result------------------------------------

export const updateResult = async (request, response, next) => {
    try {
        let id = request.params.matchId;
        let { winnerId, score } = request.body;
        let result = await Match.updateOne({ id }, { $set: { "result.winner": winnerId, "result.score": score } });
        if (result) {
            return response.status(200).json({ message: "update successfully" });
        }
        return response.status(404).json({ error: "not found" });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error" });
    }
}


//------------------------------- Find Match By MatchId--------------------------

export const MatchByUniqueMatchId = async (req, response, next) => {
    let id = req.body.matchId;
    try {
        console.log("find match: " + id);
        const data = await Match.find({ matchId: id })
        console.log("match data : " + data._id +"      "+data)
        if (data) {
            return response.status(201).json({ message: "Match Found By matchId : ", data });
        }
        return response.status(501).json({ message: " No Match Scheduled Yet found" });
    } catch (err) {
        return response.status(501).json({ message: " Internal Server Error ", err });
    }
}