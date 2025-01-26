import express from "express";
import mongoose from "mongoose"
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import UserRouter from "./routes/user.route.js";
import TeamRouter from "./routes/Team.route.js";
import PlayerRouter from "./routes/player.route.js";
import MatchRouter from "./routes/match.route.js";
import TournamentRouter from "./routes/tournament.route.js";

const app = express();
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/cricklink")
  .then(() => {
    console.log("Database connected...");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // app.get("/",(req,res)=>{
    //   // console.log("hey")
    //   res.end("Done")
    // })
    app.use("/user", UserRouter);
    app.use("/Team", TeamRouter);
    app.use("/Tournament", TournamentRouter);
    app.use("/match", MatchRouter)
    app.use("/player", PlayerRouter);

    app.listen(3001, () => {
      console.log("Server Started....");
    });

  }).catch(err => {
    console.log(err);
  })
