import { validationResult } from "express-validator"
import mongoose from "mongoose";
import {Team} from "../model/Team.model.js";
import { User } from "../model/user.model.js";
import { request, response } from "express";


//==========================Request Accepted/Rejected============================

export const reqAcceptance = async (req, res, next) => {
    try {
        const { statusR, playerId, teamId } = req.body;
        // console.log("ids : "+ playerId +" "+ teamId);

        const player = await User.findById(playerId);
        const team = await Team.findById(teamId);
        const captain = await User.findById({_id: team.captainId});
        // const pendingNotification = player.notifications.find((notif) => notif.status === "pending");
        const reqStatusP = {
            type : `Request ${statusR}`,
            receiverId : team.captainId,
            message : `Request to join team ${team.teamName} is ${statusR}.`,
            status : statusR
        }
        const reqStatusC = {
            type : `Request ${statusR}`,
            senderId : playerId,
            message : `${player.name} ${statusR} to join your team ${team.teamName}`
        }

        player.notifications.push(reqStatusP);
        await player.save();
        captain.notifications.push(reqStatusC);
        await captain.save();  

        if(statusR == "accepted"){
            team.players.push(playerId);
            await team.save(); 
            return res.status(201).json({ message: `${player.name} Added Successfully In Team ${team.teamName}` })
        }

        return res.status(201).json({ message: `${player.name} ${statusR} to join team ${team.teamName}` })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error", error });
    }
};

//=========================Request Send=========================================

export const addtoTeamReq = async (req, res, next) => {
    try {
        const { playerId, captainId } = req.body;
        const player = await User.findById(playerId);
        const captain = await User.findById(captainId);

        let team = await Team.findOne({ captainId : captainId });
        if (!team)
            return res.status(404).json({ message: "Team not found. Create yur team" });

        let teamId = team._id;
        if (!mongoose.Types.ObjectId.isValid(playerId) || !mongoose.Types.ObjectId.isValid(teamId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const notificationP = {
            type: "recieved",
            senderId : captainId,
            message: `Request to join team ${team.teamName} is received.`,
        };
        const notificationC = {
            type: "send",
            receiverId : playerId,
            message: `Request to join my team ${team.teamName} is send.`,
        };

        player.notifications.push(notificationP);
        await player.save();
        captain.notifications.push(notificationC);
        await captain.save();

        console.log("check : "+teamId+" "+playerId)
        return res.status(200).json({
            message: `Request to join my team ${team.teamName} is send.`,
            teamId
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
        const user = await User.findById({_id : userId});
        if(!user)
            console.log("no user exist");
        if(!user.notifications){
            return res.status(200).json({message : "Not Notification Yet"})
        }
            // console.log("notices : "+ user.notifications)
        return res.status(200).json({message : user.notifications})
    }catch(error){
        return res.status(500).json({error : "Internal Server Error", error})
    }
}