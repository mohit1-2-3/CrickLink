


//==============================================

import { request, response } from "express";
import {Team }from "../model/Team.model.js";
import{ User }from "../model/user.model.js";
import mongoose from "mongoose";

// --------------create tem--------------------
export const createTeam= async (request,response,next)=>{
    try{
        let result = await Team.create(request.body);
        if(result){
            return response.status(200).json({message:"create team successfully"});
        }
        return response.status(401).json({error:"bad request"});
        
    }
    catch(err){
        console.log(err);
        return response.status(500).json({error:"internal server error"});
    }
};


// --------------------view all team---------------------------
export const viewTeam= async (request,response,next)=>{
    try{
 const result=await Team.find();
 console.log(result);
 if(result){
    return response.status(200).json({Team:result});
 }
 return response.status(401).json({error:"bad error"});
    }
    catch(err){
        return response.status(500).json({error:"internal server error"});
    }
};


// -----------------------------view team with id--------------------------
export const getTeam= async (request,response,next)=>{
    try{
        let id=request.params.id
 const result=await Team.findOne({id});
 console.log(result);
 if(result){
    return response.status(200).json({Team:result});
 }
 return response.status(401).json({error:"bad error"});
    }
    catch(err){
        return response.status(500).json({error:"internal server error"});
    }
};


// -----------------find the player not part of any team------------------------------
 export const withoutTeam= async (request,response,next)=>{
    try {
        
        const teams = await Team.find({}, "players"); 
        const playersInTeams = teams.reduce((acc, team) => {
            acc.push(...team.players);
            return acc;
        }, []);

        const playersWithoutTeam = await User.find({
            _id: { $nin: playersInTeams,},role:"player"
        });

        response.status(200).json(playersWithoutTeam);
    } catch (error) {
        console.error("Error fetching players without a team:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
 }




 //---request by player to team----
 export const addtoTeamReq = async (req, res, next) => {
    try {
      const { playerId, teamId } = req.body;
  
      if (!playerId || !teamId) {
        return res.status(400).json({ message: "Player ID and Team ID are required" });
      }
  
      if (!mongoose.Types.ObjectId.isValid(playerId) || !mongoose.Types.ObjectId.isValid(teamId)) {
        return res.status(400).json({ message: "Invalid ObjectId format" });
      }
  
   
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
  
      const player = await User.findById(playerId);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
  
      const notification = {
        type: "request",
        message: `Your request to join the team ${team.teamName} is pending.`,
        status: "pending",
      };
  
      player.notifications.push(notification);
      await player.save();
  
      return res.status(200).json({
        message: `Player's request to join the team ${team.teamName} is pending.`,
        team,
        player,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error });
    }
  };
  





//----------request handle by team(captain)



export const reqacceptBYCaptin = async (req, res, next) => {
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
  