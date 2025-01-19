import { request, response } from "express";
import { Match } from "../model/match.model.js";
import Tournament from "../model/tournament.model.js";
import {Team} from "../model/Team.model.js";

// ---------------craete catch------------------------------
export const createMatches= async (request,response,next)=>{
    req.body.startDate = startDate.split('T')[0];
    req.body.endDate = endDate.split('T')[0];
    try {
        const result=await Match.create(request.body);
        if(result){
            return response.status(200).json({message:"craete match  successfully"});
        }
        else{
            return response.status(400).json({error:"bad error"});
        }
}
catch(err){
    console.log(err);
    return response.status(500).json({erroe:"internal server error"});
}
};

// -----------------------view match--------------------------------
export const viewMatches= async (request,response,next)=>{
    try{
        const result= await Match.find()
        .populate("tournamentId","TournamentName")
        .populate("team1","teamName")
        .populate("team2","teamName");
        return response.status(200).json({Match:result});
    }
    catch(err){
        console.log(err);
        return response.status(500).json({error:"internal server error"});
    }
};


// -------------------view matches with tournament id---------------------
export const tournamentMatch= async (request,response,next)=>{
    try{
        const id=request.params.id;
        const result=await Match.findOne({id})
        .populate("tournamentId","TournamentName")
        .populate("team1","teamName")
        .populate("team2","teamName");
        
        console.log(result);
        if(result){
            return response.status(200).json({Match:result});
        }
        return response.status(404).json({error:"not found"});
    }
    catch(err){
        console.log(err);
        return response.status(500).json({error:"internal server error"});
    }
};


// --------------------------update result------------------------------------
export const updateResult= async(request,response,next)=>{
    try{
        let id=request.params.matchId;
        let {winnerId,score}= request.body;
        let result =await Match.updateOne({id},{$set:{"result.winner":winnerId,"result.score":score}});
        if(result){
            return response.status(200).json({message:"update successfully"});
        }
        return response.status(404).json({error:"not found"});
    }
    catch(err){
        return response.status(500).json({error:"internal server error"});
    }
}