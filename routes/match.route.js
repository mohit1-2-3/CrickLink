import express from "express";
import { createMatches,viewMatches ,tournamentMatch,updateResult} from "../controller/match.controller.js";

const router=express.Router();

router.post("/createMatches",createMatches);

router.get("/matches", viewMatches);

router.get("/tournament/:tournamentId",tournamentMatch);

router.patch("/result/:matchId",updateResult);

// router.get("/schedule/:tournamentId",matchSchedule)



export default router;