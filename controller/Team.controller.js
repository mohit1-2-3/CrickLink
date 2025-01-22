import { validationResult } from "express-validator"

import mongoose from "mongoose";
import { Team } from "../model/Team.model.js";
import { User } from "../model/user.model.js";
import { request, response } from "express";

import Team from "../model/Team.model.js";
//import{ User }from "../model/user.model.js";
// import { request, response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


// --------------create tem--------------------

export const createTeam = async (request, response, next) => {
    try {
        const { teamName, username } = request.body;

        // Find the captain by username
        const captain = await User.findOne({ name: username });
        if (!captain) {
            return response.status(404).json({ error: "Captain not found" });
        }

        // Create the team with captainId
        const result = await Team.create({
            teamName: teamName,
            captainId: captain._id,
        });

        if (result) {
            return response.status(201).json({ message: "Team created successfully", team: result });
        }

        return response.status(400).json({ error: "Bad request" });
    } catch (err) {
        console.error(err);
        return response.status(500).json({ error: "Internal server error" });
    }
};


// --------------------view all team---------------------------

export const viewTeam = async (request, response, next) => {
    try {
    const result = await Team.find().populate("captainId", "name") .populate("players", "name");
        console.log(result);
        if (result) {
            return response.status(200).json({ Team: result });
        }
        return response.status(401).json({ error: "bad error" });
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "internal server error" });
    }
};



// -----------------------------view team with id--------------------------

export const getTeam = async (request, response, next) => {
    try {
        let teamId = request.params.teamId;
        const result = await Team.findOne({ _id: teamId }).populate("players");
        console.log(result);
        if (result) {
            return response.status(200).json({ Team: result });
        }
        return response.status(401).json({ error: "bad error" });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error" });
    }
};


// -----------------find the player not part of any team-----------------------------

export const withoutTeam = async (request, response, next) => {
    try {

        const teams = await Team.find({}, "players");
        const playersInTeams = teams.reduce((acc, team) => {
            acc.push(...team.players);
            return acc;
        }, []);

        const playersWithoutTeam = await User.find({
            _id: { $nin: playersInTeams, }, role: "player"
        });

        return response.status(200).json(playersWithoutTeam);
    } catch (error) {
        console.error("Error fetching players without a team:", error);
        return response.status(500).json({ message: "Internal Server Error" });
    }
}


//---request by player to team----
// export const addtoTeamReq = async (req, res, next) => {
//     try {
//       const { playerId, teamId } = req.body;
//   console.log(req.body)
//       if (!playerId || !teamId) {
//         return res.status(400).json({ message: "Player ID and Team ID are required" });
//       }
  
//       if (!mongoose.Types.ObjectId.isValid(playerId) || !mongoose.Types.ObjectId.isValid(teamId)) {
//         return res.status(400).json({ message: "Invalid ObjectId format" });
//       }
  
   
//       const team = await Team.findById(teamId);
//       if (!team) {
//         return res.status(404).json({ message: "Team not found" });
//       }
  
//       const player = await User.findById(playerId);
//       if (!player) {
//         return res.status(404).json({ message: "Player not found" });
//       }
  
//       const notification = {
//         type: "request",
//         message: `Your request to join the team ${team.teamName} is pending.`,
//         status: "pending",
//       };
  
//       player.notifications.push(notification);
//       await player.save();
  
//       return res.status(200).json({
//         message: `Player's request to join the team ${team.teamName} is pending.`,
//         team,
//         player,
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Server error", error });
//     }
//   };
  





// //----------request handle by team(captain)



export const reqacceptBYCaptin= async (req, res, next) => {
    try {
      const { status, playerId, teamId} = req.body;
  
      const player = await User.findById(playerId);
      const team = await Team.findById(teamId);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
  
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
  
  
      const pendingNotification = player.notifications.find( (notif) => notif.status === "pending");
  
      pendingNotification.status = status;
      pendingNotification.message = `Player's request to join the team is ${status}`;
       
      await player.save();
  
      team.players.push(playerId);
      await team.save();
  
      return res.status(201).json({message : "player Added Successfully In Team"})
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  };
  





//==========================Request Accepted/Rejected============================

// export const reqacceptBYCaptin = async (req, res, next) => {
//   try {
//       const { statusR, playerId, teamId } = req.body;

//       // Step 1: Fetch player, team, and captain details
//       const player = await User.findById(playerId);
//       const team = await Team.findById(teamId);
//       if (!team) {
//           return res.status(404).json({ message: "Team not found." });
//       }
//       const captain = await User.findById(team.captainId);

//       // Step 2: Check if the request exists in team's pendingRequests
//       const requestIndex = team.pendingRequests.findIndex((req) => req.playerId === playerId);
//       if (requestIndex === -1) {
//           return res.status(400).json({ message: "No pending request from this player for the team." });
//       }

//       // Step 3: Handle acceptance or rejection
//       if (statusR === "accepted") {
//           // Add player to team
//           team.players.push(playerId);
//           team.pendingRequests.splice(requestIndex, 1); // Remove the request from pendingRequests

//           // Notification for player
//           const notificationForPlayer = {
//               type: "team-join",
//               senderId: team.captainId,
//               message: `Your request to join team ${team.teamName} has been accepted.`,
//           };
//           player.notifications.push(notificationForPlayer);
//           await player.save();

//           // Save team updates
//           await team.save();

//           return res.status(201).json({ message: `${player.name} added successfully to team ${team.teamName}` });
//       } else if (statusR === "rejected") {
//           // Remove the request from pendingRequests
//           team.pendingRequests.splice(requestIndex, 1);

//           // Notification for player
//           const notificationForPlayer = {
//               type: "team-join",
//               senderId: team.captainId,
//               message: `Your request to join team ${team.teamName} has been rejected.`,
//           };
//           player.notifications.push(notificationForPlayer);
//           await player.save();

//           // Save team updates
//           await team.save();

//           return res.status(200).json({ message: `${player.name}'s request to join team ${team.teamName} was rejected.` });
//       } else {
//           return res.status(400).json({ message: "Invalid status. Use 'accepted' or 'rejected'." });
//       }
//   } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: "Server error", error });
//   }
// };


//=========================Request Send=========================================

export const addtoTeamReq = async (req, res, next) => {
  try {
    const { playerId, teamId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(playerId) || !mongoose.Types.ObjectId.isValid(teamId)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const player = await User.findById(playerId);
    const team = await Team.findById(teamId);

    if (!player) {
      return res.status(404).json({ message: "Player not found. Please check the player ID." });
    }

    if (!team) {
      return res.status(404).json({ message: "Team not found. Please check the team ID." });
    }

    if (team.players.includes(playerId)) {
      return res.status(400).json({ message: "Player is already part of the team." });
    }

    const captainId = team.captainId;
    const captain = await User.findById(captainId);

    const notificationForCaptain = {
      type: "received",
      senderId: playerId,
      message: `${player.name} has requested to join your team ${team.teamName}.`,
    };

    const notificationForPlayer = {
      type: "sent",
      receiverId: captainId,
      message: `Your request to join team ${team.teamName} has been sent to the captain.`,
    };

    captain.notifications.push(notificationForCaptain);
    await captain.save();

    player.notifications.push(notificationForPlayer);
    await player.save();

    return res.status(200).json({
      message: `Request to join team ${team.teamName} has been sent successfully.`,
      teamId,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Server error", error });
  }
};



//=============================== View Notification =====================================

export const getNotification = async (req, res, next) => {
    let {userId} = req.params;
    try{
        const user = await User.findById({_id : userId}).populate("receiverId","name");
        if(!user)
            console.log("no user exist");
        if(!user.notifications){
            return res.status(200).json({message : "Not Notification Yet"})
        }
            // console.log("notices : "+ user.notifications)
        return res.status(200).json({message : user.notifications})
    }catch(error){
        return res.status(500).json({error : "Internal Server Error",error})
}
}

