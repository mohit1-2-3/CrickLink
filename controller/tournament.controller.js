import Tournament  from "../model/tournament.model.js";
import { response } from "express";
import { User } from "../model/user.model.js";
import { Match } from "../model/match.model.js";
import Team  from "../model/Team.model.js";

export const createTournamentReq = async (req, response, next) => {
  try {
    const insert = await Tournament.create(req.body);
    return response.status(201).json({ msg: " tournament created : ", insert });
  } catch (err) {
    return response.status(501).json({ msg: " internal server error", err });
  }
}

export const tournamentList = async (req, response, next) => {
  try {
    const view = await Tournament.find().populate("organizerId");

    if (!view) {
      return response.status(501).json({ msg: "No tournaments found" });
    }
    return response.status(201).json({ msg: "Tournament list: ", view });
  } catch (err) {
    return response.status(501).json({ msg: "Internal server error" });
  }
};

export const tournamentById = async (req, response, next) => {
  let { id } = req.params;
  try {
    const view = await Tournament.findById({ _id: id }).populate("organizerId").populate("schedule.matchId");

    if (view) {
      return response.status(201).json({ msg: "Tournaments found", view });
    }
    return response.status(501).json({ msg: " No tournament found" });
  } catch (err) {
    return response.status(501).json({ msg: " internal server error ", err });

  }
}


export const deleteTournament = async (req, response, next) => {
  const id = req.params.id;
  try {
    const del = await Tournament.deleteOne({ _id: id });
    response.status(201).json({ err: "tournament deleted!", del });
  } catch (err) {
    response.status(501).json({ err: "tournament not deleted!", err });
  }
}

export const updateTornament = async (req, response, next) => {
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