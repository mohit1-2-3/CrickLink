import { validationResult } from "express-validator"
import { Team } from "../model/Team.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const createTeam= async (req, res) => {
  const { teamName, captainId } = req.body;

  try {
    const newTeam = new Team({ teamName, captainId });
    await newTeam.save();
    res.status(201).json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    res.status(500).json({ message: "Error creating team", error: error.message });
  }
};


