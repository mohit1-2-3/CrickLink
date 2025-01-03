import express from "express";
import { createTeam} from "../controller/Team.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/createTeam",
body("Teamname","Teamname is required").notEmpty(),
body("captainId","captainId is required").notEmpty(),
createTeam);
 
export default router;