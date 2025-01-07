import express from "express";
import { signUp,signIn,updateProfile,viewProfile} from "../controller/user.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post("/signup",
body("name","username is required").notEmpty(),
body("email","Invalid email id").isEmail(),
body("email","Email id is required").notEmpty(),
body("password","password is required").notEmpty(),
body("contect","contect is required").notEmpty(),signUp);
 
router.post("/signin",signIn);

router.put("/updateProfile/:userId",updateProfile);
router.get("/profile/:userId", viewProfile);



export default router;