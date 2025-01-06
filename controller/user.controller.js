import { validationResult } from "express-validator"
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//---------------------user signUP----------------------------
export const signUp = async (request,response,next)=>{
    try{  
    
     const errors =  validationResult(request);
     console.log(errors);
     if(!errors.isEmpty()){
        console.log(errors);
       return response.status(401).json({error:"Bad request"});
     }
     let saltKey = bcrypt.genSaltSync(10);
     let encryptedPassword = bcrypt.hashSync(request.body.password,saltKey);
     request.body.password = encryptedPassword;
     console.log("===============================");
     console.log(request.body);
     let user = await User.create(request.body);  
     return response.status(201).json({message: "Sign up success",user});
    }
    catch(err){
      console.log(err);
      return response.status(500).json({error: "Internal Server Error"});
    }
  };
 
  
  //--------------------------user signIn----------------------------------
  export const signIn =  async (request,response,next)=>{

    try{
        let {email,password} = request.body;
        let user = await User.findOne({email});
        if(user){
          let status = bcrypt.compareSync(password,user.password);
          return status ? response.status(200).json({message: "Sign in success..",user,token: generateToken(user._id)}) : response.status(401).json({error: "Bad request | invalid password"})
        }
        else
         return response.status(401).json({error: "Bad request | invalid email id"});
       }
       catch(err){
        console.log(err);
        return response.status(500).json({error: "Internal Server Error"});
       }
    };
    const generateToken = (userId)=>{
       let token = jwt.sign({payload: userId},"fsdfsdrereioruxvxncnv");
       return token; 
    };

   // --------------------------profileUpdate---------------------------------------

   export const updateProfile = async (req, res) => {
    const { userId } = req.params;
    const { skills, experience, location, profile_photo } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          "profile.skills": skills,
          "profile.experience": experience,
          "profile.location": location,
          profile_photo: profile_photo,
        },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ message: "Profile updated successfully", user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  //--------------------------- show profile -----------------------------

  
  export const viewProfile = async (req, res) => {
    const { userId } = req.params;
  
    try {
      
      const user = await User.findById(userId, "name role profile");
      const user1 = await User.findById("67705cf1ba1ce25d26651ab7");
console.log(user1);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      
      res.status(200).json({
        name: user.name,
        role: user.role,
        profile: {
          skills: user.profile.skills,
          experience: user.profile.experience,
          location: user.profile.location,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };