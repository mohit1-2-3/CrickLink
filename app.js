import express from "express";
import mongoose from "mongoose"
import bodyParser from "body-parser";
import UserRouter from "./routes/user.route.js";
import TeamRouter from "./routes/Team.route.js";
import PlayerRouter from "./routes/player.route.js";
import MatchRouter from "./routes/match.route.js";
const app = express();
mongoose.connect("mongodb://localhost:27017/cricklink")
.then(()=>{
  console.log("Database connected...");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.get("/",(req,res)=>{
    // console.log("hey")
    res.end("Done")
  })
  app.use("/user",UserRouter);
  app.use("/Team",TeamRouter);
  app.use("/match",MatchRouter)
app.use("/player",PlayerRouter);

<<<<<<< HEAD
  app.listen(3001,()=>{
=======

  app.listen(3100,()=>{
>>>>>>> origin/master
    console.log("Server Started....");
  });

}).catch(err=>{
    console.log(err);
})
