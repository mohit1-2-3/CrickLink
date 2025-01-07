import express from "express";
import mongoose from "mongoose"
import bodyParser from "body-parser";
import UserRouter from "./routes/user.route.js";
import TeamRouter from "./routes/Team.route.js";
import PlayerRouter from "./routes/player.route.js";
import MatchRouter from "./routes/match.route.js";
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/Cricklink")
.then(()=>{
  console.log("Database connected...");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use("/user",UserRouter);
  app.use("/Team",TeamRouter);
  app.use("/match",MatchRouter)
app.use("/player",PlayerRouter);


  app.listen(3100,()=>{
    console.log("Server Started....");
  });

}).catch(err=>{
    console.log(err);
})
