import express from "express";

import { createTeam, viewTeam, getTeam } from "../controller/Team.controller.js";
import { reqAcceptance, addtoTeamReq } from "../controller/notification.controller.js";

import { createTeam,viewTeam,getTeam,addtoTeamReq,reqacceptBYCaptin,getNotification} from "../controller/Team.controller.js";

import { body } from "express-validator";

const router = express.Router();

router.post("/createTeam",
    body("Teamname", "Teamname is required").notEmpty(),
    body("captainId", "captainId is required").notEmpty(),
    createTeam);

router.get("/viewteam", viewTeam);
router.get("/:teamId", getTeam);

router.post("/req-to-join", addtoTeamReq);
router.put("/req-res", reqAcceptance);


router.get("/viewteam",viewTeam);
router.get("/:teamId",getTeam);

router.post("/req-to-join",addtoTeamReq);
router.put("/req-res",reqacceptBYCaptin);
router.get("/notification/:userId",getNotification )



 

export default router;
