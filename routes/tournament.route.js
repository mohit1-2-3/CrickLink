import express from "express";
import { createTournamentReq, tournamentList, tournamentById, deleteTournament, updateTornament} from "../controller/tournament.controller.js";

const router = express.Router();

router.post("/createTournamentReq", createTournamentReq);
router.get("/tournamentList", tournamentList);
router.get("/tournamentById", tournamentById);
router.delete("/deleteTournament", deleteTournament);
router.patch("/updateTornament", updateTornament);

export default router;