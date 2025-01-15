import { request, response } from "express";
import { Match } from "../model/match.model.js";
import { Tournament } from "../model/tournament.model.js";


// ---------------craete catch------------------------------
export const createMatches= async (request,response,next)=>{
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
        const result= await Match.find();
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
        const result=await Match.findOne({id});
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
        let id=request.params.id;
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
};

// ==========================================================================



export const matchSchedule= async (req, res) => {
    try {
        const {tournamentId }= req.params;
        console.log(tournamentId);

      
        const tournament = await Tournament.findById(tournamentId)
            .populate({
                path: 'schedule.matchId', 
                model: 'match',          
            });
            console.log(tournament)

        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        res.status(200).json(tournament);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};




// ==============================================================================

