import { validationResult } from "express-validator"

import {Team} from "../model/Team.model.js";
import{ User }from "../model/user.model.js";
import { request, response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// --------------create tem--------------------
export const createTeam = async (request, response, next) => {
    try {
        let result = await Team.create(request.body);
        if (result) {
            return response.status(200).json({ message: "create team successfully" });
        }
        return response.status(401).json({ error: "bad request" });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "internal server error" });
    }
};


// --------------------view all team---------------------------
export const viewTeam = async (request, response, next) => {
    try {
        const result = await Team.find();
        console.log(result);
        if (result) {
            return response.status(200).json({ Team: result });
        }
        return response.status(401).json({ error: "bad error" });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error" });
    }
};


// -----------------------------view team with id--------------------------
export const getTeam = async (request, response, next) => {
    try {
        let teamId = request.params.teamId;
        const result = await Team.findOne({ _id: teamId });
        console.log(result);
        if (result) {
            return response.status(200).json({ Team: result });
        }
        return response.status(401).json({ error: "bad error" });
    }
    catch (err) {
        return response.status(500).json({ error: "internal server error" });
    }
};


// -----------------find the player not part of any team------------------------------
export const withoutTeam = async (request, response, next) => {
    try {

        const teams = await Team.find({}, "players");
        const playersInTeams = teams.reduce((acc, team) => {
            acc.push(...team.players);
            return acc;
        }, []);

        const playersWithoutTeam = await User.find({
            _id: { $nin: playersInTeams, }, role: "player"
        });

        response.status(200).json(playersWithoutTeam);
    } catch (error) {
        console.error("Error fetching players without a team:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
}