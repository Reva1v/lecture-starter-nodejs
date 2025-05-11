import {FIGHTER} from "../models/fighter.js";
import {validateStructure} from "../validators/validateStructure.js";

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for FIGHTER entity during creation

    const structureError = validateStructure(req.body, FIGHTER, [
        "name",
        "power",
        "defense"
    ]);
    if (structureError) {
        return res.status(400).json({error: true, message: structureError});
    }

    const {health, power, defense} = req.body;

    if (!health) {
        req.body.health = FIGHTER.health;
    } else if (typeof health !== typeof FIGHTER.health && health < 80 || health > 120) {
        return res.status(400).json({
            error: true,
            message: "Health must be a number between 80 and 120",
        });
    }

    if (typeof power !== typeof FIGHTER.power || power < 0 || power > 100) {
        return res.status(400).json({
            error: true,
            message: "Power must be a number between 0 and 100",
        });
    }
    if (typeof defense !== typeof FIGHTER.defense || defense < 1 || defense > 10) {
        return res.status(400).json({
            error: true,
            message: "Defense must be a number between 1 and 10",
        });
    }
    next();
};

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for FIGHTER entity during update
    const structureError = validateStructure(req.body, FIGHTER);
    if (structureError) {
        return res.status(400).json({error: true, message: structureError});
    }

    const {name, health, power, defense} = req.body;

    if (name !== undefined && name.trim() === "") {
        return res.status(400).json({error: true, message: "Name cannot be empty."});
    }

    if (health !== undefined && (typeof health !== typeof FIGHTER.health || health < 80 || health > 120)) {
        return res.status(400).json({
            error: true,
            message: "Health must be a number between 80 and 120",
        });
    }
    if (power !== undefined && (typeof power !== typeof FIGHTER.power || power < 0 || power > 100)) {
        return res.status(400).json({
            error: true,
            message: "Power must be a number between 0 and 100",
        });
    }

    if (defense !== undefined && (typeof defense !== typeof FIGHTER.defense || defense < 1 || defense > 10)) {
        return res.status(400).json({
            error: true,
            message: "Defense must be a number between 1 and 10",
        });
    }

    if (req.body.id !== undefined) {
        return res.status(400).json({error: true, message: "id should not be present in body"});
    }

    next();
};

export {createFighterValid, updateFighterValid};
