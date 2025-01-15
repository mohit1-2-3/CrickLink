import express from "express";
import { createTeam,viewTeam,getTeam,teamlist,addtoTeamReq,reqacceptBYCaptin} from "../controller/Team.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/createTeam",
body("Teamname","Teamname is required").notEmpty(),
body("captainId","captainId is required").notEmpty(),
createTeam);

router.get("/viewteam",viewTeam);
router.get("/:teamId",getTeam);

router.get("/open-recruitment",teamlist);
router.post("/req-to-join",addtoTeamReq);
router.put("/req-res",reqacceptBYCaptin);

 
export default router;
