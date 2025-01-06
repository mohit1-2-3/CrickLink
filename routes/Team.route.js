import express from "express";
import { createTeam } from "../controller/Team.controller.js";
import { body } from "express-validator";

const router = express.Router();

// Route for creating a team
router.post(
  "/createteam",
  
    body("teamName", "Team name is required").notEmpty(),
    body("captainId", "Captain ID is required").notEmpty(),
  
  createTeam
);

export default router;
