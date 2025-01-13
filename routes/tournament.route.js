import express from "express";
import { createTournamentReq, tournamentList, tournamentById, deleteTournament, updateTornamentSchedule, addTeam} from "../controller/tournament.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/createTournamentReq", createTournamentReq);
router.get("/tournamentList", tournamentList);
router.get("/tournamentById/:id", tournamentById);
router.delete("/deleteTournament/:id", deleteTournament);
router.patch("/updateTornament/:id", updateTornamentSchedule);
router.patch("/addTeam/:id",
    body("name","team name is required").notEmpty(),
    addTeam);

export default router;