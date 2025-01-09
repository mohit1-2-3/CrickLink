import express from "express";
import { signUp,signIn,updateProfile,viewProfile,sendOTPController,updatePasswordWithOTP} from "../controller/user.controller.js";
import { body } from "express-validator";
import { uploadProfilePhoto } from "../config/multerSetup.js";

const router = express.Router();

router.post("/signup",
body("name","username is required").notEmpty(),
body("email","Invalid email id").isEmail(),
body("email","Email id is required").notEmpty(),
body("password","password is required").notEmpty(),
body("contect","contect is required").notEmpty(),signUp);
 
router.post("/signin",signIn);

router.put("/updateProfile/:userId", uploadProfilePhoto,updateProfile);
router.get("/profile/:userId", viewProfile);
router.post("/sendOTP", sendOTPController)
router.post("/updatePassword", updatePasswordWithOTP)



export default router;