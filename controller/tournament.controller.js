import Tournament from "../model/tournament.model.js";
import { response } from "express";
import { User } from "../model/user.model.js";
import { Match } from "../model/match.model.js";
import { Team } from "../model/Team.model.js";



// -----------------------------Create Tournament--------------------------

export const createTournamentReq = async (req, response, next) => {
  try {
    let { organizer_name } = req.body;
    console.log("organizer_name : " + organizer_name);
 
    // const organizer = await User.findOne({ name : organizer_name });
    // console.log("organizer : "+organizer);
    // if (organizer.role == "organizer") {
    //   // req.body.organizerId = organizer._id;

      const insert = await Tournament.create(req.body);
      console.log("insert : "+ insert)
      return response.status(201).json({ message: " tournament created : ", insert });
    }catch (err) {
    return response.status(501).json({ message: " Internal server error", err });
  }
}

// -----------------------------Get Tournament List--------------------------


// export const tournamentList = async (req, response, next) => {
//   try {
//     const tournaments = await Tournament.find()
//       .populate("organizerId", "name")
//       .populate("teams.teamId", "teamName")
//       .populate({path: "schedule.matchId", select : "matchId team1 team2 date venue"});

//     if (!tournaments || tournaments.length === 0) {
//       return response.status(401).json({ msg: "No tournament found" });
//     }
//     return response.status(201).json({ msg: "Tournament list: ", tournaments });
//   } catch (err) {
//     return response.status(501).json({ msg: "Internal server error", err });
//   }
// };

export const tournamentList = async (req, res, next) => {
  try {
    const tournaments = await Tournament.find()
      .populate("organizerId", "name")
      .populate({ path: "teams.teamId", select: "teamName " })
      .populate({
        path: "schedule.matchId", select: "matchId date venue result",
        populate: [
          { path: "team1 team2", select: "teamName" },
          { path: "result.winnerId", select: "teamName" }
        ]
      });
    let currentDate = Date.now();
    currentDate = new Date(currentDate);
    // console.log("currentDate : " + currentDate);
    tournaments.map(async (tourna) => {
      if (tourna && tourna.startDate < currentDate && tourna.status === "active") {
        console.log("status : " + tourna.status);
        tourna.status = "inactive";
        await tourna.save();
      }
    })


    if (!tournaments || tournaments.length === 0) {
      return res.status(404).json({ message: "No tournaments found" });
    }

    // Return the tournaments with populated match details
    return res.status(200).json({
      msg: "Tournament list with schedules and match details",
      tournaments,
    });
  } catch (err) {
    // Log the full error to the console for debugging
    console.error('Error in tournamentList:', err);
    return res.status(500).json({ message: "Internal server error", err: err.message });
  }
};

// -----------------------------Get Tournament By ID--------------------------

export const tournamentById = async (req, response, next) => {
  let { id } = req.params;
  try {
    const data = await Tournament.find({ $or: [{ _id: id }, { organizerId: id }] })
      .populate("organizerId", "name")
      .populate({ path: "teams.teamId", select: "teamName " })
      .populate({
        path: "schedule.matchId", select: "matchId date venue result",
        populate: [
          { path: "team1 team2", select: "teamName" },
          { path: "result.winnerId", select: "teamName" }
        ]
      });
      console.log("data : "+ data)
    if (data) {
      return response.status(201).json({ message: "Tournaments By Specific ID found", data });
    }
    return response.status(501).json({ message: " No tournament found" });
  } catch (err) {
    return response.status(501).json({ message: " internal server error ", err });
  }
}


// -----------------------------Delete Tournament--------------------------

export const deleteTournament = async (req, response, next) => {
  const id = req.params.id;
  try {
    const del = await Tournament.deleteOne({ _id: id });
    response.status(201).json({ message: "tournament deleted!", del });
  } catch (err) {
    response.status(501).json({ err: "tournament not deleted!", err });
  }
}


// -----------------------------Update Match Schedule--------------------------

export const updateTornamentSchedule = async (req, res, next) => {
  const tournamentId = req.params.id;
  const { matchId } = req.body;

  try {
    const match = await Match.findOne({ matchId : matchId });

    if (!match) {
      return res.status(404).json({ message: "Match not found!" });
    }
    const mid = match._id;
    const tournament = await Tournament.findOne({ _id: tournamentId });

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found!" });
    }

    // Check if the match is already scheduled
    const isMatchScheduled = tournament.schedule.some(
      (matchSchedule) => matchSchedule.matchId.toString() === mid.toString()
    );

    if (isMatchScheduled) {
      return res.status(400).json({ message: "Match is already scheduled." });
    }

    // Add the match to the tournament's schedule
    tournament.schedule.push({ matchId: mid });

    // Save the updated tournament
    await tournament.save();

    return res.status(200).json({ message: "Match scheduled successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error updating the tournament schedule.", err });
  }
};



// -----------------------------Add Team To Tournament--------------------------

export const addTeam = async (req, response, next) => {
  let tournaId = req.params.id;
  console.log("tounaId : "+ tournaId)
  let { team_name, captainEmail } = req.body;
  console.log("team data : "+ team_name+" "+captainEmail)
  try {
    const tournament = await Tournament.findOne({ _id: tournaId });
    console.log("tournament "+ tournament)

    const captain = await User.findOne({ email: captainEmail });
    if (captain) {
      let id = captain._id;
      console.log("captain : "+ captain)
      console.log("tournament "+ tournament)
      console.log("team : "+team_name+" "+ id );
      const team = await Team.findOne({ teamName: team_name, captainId: id });
      console.log("ygsg : "+ team)
     
      if(!team){
        return response.status(201).json({ message: "team registration required" });
      }else{
        if (team.players.length < 10)
          return response.status(201).json({ message: "Team with 11 players can only register for the tournament" });

        const registering = tournament.teams.filter((team) => { return team.teamId === teamId });
        console.log("no error : ", registering)
        if (registering) {
          return response.status(201).json({ message: "Team is already registered!" });
        }
        tournament.teams.push({ teamId });
        await tournament.save();
        return response.status(201).json({ message: "Team Registered." });
      }
    }else{
      return response.status(201).json({ message: "User and Team Registration required." });

    }
  } catch (err) {
    return response.status(501).json({ error: "internal server error" });
  }
}
