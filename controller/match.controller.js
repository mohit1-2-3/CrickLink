import { request, response } from "express";
import { Match } from "../model/match.model.js";


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
}

