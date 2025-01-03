import express from "express";
import mongoose from "mongoose"
import bodyParser from "body-parser";
import UserRouter from "./routes/user.route.js";
import TeamRouter from "./routes/Team.route.js";
const app = express();
mongoose.connect("mongodb://localhost:27017/cricklink")
.then(()=>{
  console.log("Database connected...");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use("/user",UserRouter);
  app.use("/Team",TeamRouter);

  app.listen(3000,()=>{
    console.log("Server Started....");
  });

}).catch(err=>{
    console.log(err);
})