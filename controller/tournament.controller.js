import Tournament from "../model/tournament.model.js";
import { response } from "express";
import { User } from "../model/user.model.js";
import { Match } from "../model/match.model.js";
import Team from "../model/Team.model.js";


// -----------------------------Create Tournament--------------------------

export const createTournamentReq = async (req, response, next) => {
  try {
    let { organizerId } = req.body;
    const organizer = await User.findOne({ _id: organizerId });
    if (organizer.role == "organizer") {
      const insert = await Tournament.create(req.body);
      return response.status(201).json({ msg: " tournament created : ", insert });
    } else
      return response.status(401).json({ restricted: " Sorry : Only organizer can organize tournament " });
  } catch (err) {
    return response.status(501).json({ msg: " internal server error", err });
  }
}

// -----------------------------Get Tournament List--------------------------

export const tournamentList = async (req, response, next) => {
  try {
    const view = await Tournament.find()
      .populate("organizerId", "name")
      .populate("teams.teamId", "teamName");
    if (!view) {
      return response.status(501).json({ msg: "No tournament found" });
    }
    return response.status(201).json({ msg: "Tournament list: ", view });
  } catch (err) {
    return response.status(501).json({ msg: "Internal server error", err });
  }
};


// -----------------------------Get Tournament By ID--------------------------

export const tournamentById = async (req, response, next) => {
  let { id } = req.params;
  try {
    const view = await Tournament.findById({ _id: id })
      .populate("organizerId", "name")
      .populate("teams.teamId", "teamName")
    if (view) {
      return response.status(201).json({ msg: "Tournaments found", view });
    }
    return response.status(501).json({ msg: " No tournament found" });
  } catch (err) {
    return response.status(501).json({ msg: " internal server error ", err });

  }
}


// -----------------------------Delete Tournament--------------------------

export const deleteTournament = async (req, response, next) => {
  const id = req.params.id;
  try {
    const del = await Tournament.deleteOne({ _id: id });
    response.status(201).json({ err: "tournament deleted!", del });
  } catch (err) {
    response.status(501).json({ err: "tournament not deleted!", err });
  }
}


// -----------------------------Update Match Schedule--------------------------

export const updateTornamentSchedule = async (req, response, next) => {
  let tournamentId = req.params.id;
  let { matchId } = req.body;
  try {
    let tourna = await Tournament.findOne({ _id: tournamentId });
    if (tourna) {
      let status = tourna.schedule.some((matchT) => { return matchT.matchId == matchId });
      if (status) {
        return response.status(201).json({ msg: "match is already scheduled." });
      }
      tourna.schedule.push({ matchId });

      await tourna.save();
      return response.status(201).json({ msg: "match scheduled successfully." });
    } else {
      return response.status(401).json({ error: "no tournament with reference to this ID!" })
    }
  }
  catch (err) {
    return response.status(501).json({ error: "tournament not updated!", err });
  }
}


// -----------------------------Add Team To Tournament--------------------------

export const addTeam = async (req, response, next) => {
  let tId = req.params.id;
  let { team_name, captainEmail } = req.body;
  try {
    const tournament = await Tournament.findOne({ _id: tId });
    const captain = await User.findOne({ email: captainEmail });
    if (captain) {
      let id = captain.id;
      const team = await Team.findOne({ teamName: team_name, captainId: id });
      let teamId = team.id;
      if (team) {
        const registering = tournament.teams.some((team) => { return team.teamId === teamId });
        if (registering) {
          return response.status(201).json("Team is already registered!");
        }
        tournament.teams.push({ teamId });
        await tournament.save();
        return response.status(201).json("team registered.");
      }
    }
  } catch (err) {
    return response.status(501).json({ error: "internal server error" });
  }

}