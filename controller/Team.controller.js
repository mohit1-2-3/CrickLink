import { validationResult } from "express-validator";
import { Team } from "../model/Team.model.js";

export const createTeam = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { teamName, captainId } = req.body;

  try {
    const newTeam = await Team.create({ teamName, captainId });
    res.status(201).json({ message: "Team created successfully", team: newTeam });
  } catch (error) {
    res.status(500).json({ message: "Error creating team", error: error.message });
  }
};
