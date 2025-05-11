import {USER} from "../models/user.js";
import  {validateStructure} from "../validators/validateStructure.js";

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for USER entity during creation
    const structureError = validateStructure(req.body, USER, [
        "firstName",
        "lastName",
        "email",
        "phone",
        "password"
    ]);
    if (structureError) {
        return res.status(400).json({ error: true, message: structureError });
    }

    const { email, phone, password, id } = req.body;

    if (id !== undefined) {
        return res.status(400).json({ error: true, message: "id should not be present in body" });
    }

    if (!email.endsWith("@gmail.com")) {
        return res.status(400).json({ error: true, message: "Invalid email. Only Gmail is allowed." });
    }

    if (!/^\+380\d{9}$/.test(phone)) {
        return res.status(400).json({ error: true, message: "Invalid phone number. Format: +380xxxxxxxxx." });
    }

    if (password.length < 4) {
        return res.status(400).json({ error: true, message: "Invalid password. Must be at least 4 characters long." });
    }

    next();
};

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    const structureError = validateStructure(req.body, USER);
    if (structureError) {
        return res.status(400).json({ error: true, message: structureError });
    }

    const { firstName, lastName, email, phone, password, id } = req.body;

    if (id !== undefined) {
        return res.status(400).json({ error: true, message: "id should not be present in body" });
    }

    if (email !== undefined && !email.endsWith("@gmail.com")) {
        return res.status(400).json({ error: true, message: "Invalid email. Only Gmail is allowed." });
    }

    if (phone !== undefined && !/^\+380\d{9}$/.test(phone)) {
        return res.status(400).json({ error: true, message: "Invalid phone number. Format: +380xxxxxxxxx." });
    }

    if (password !== undefined && password.length < 4) {
        return res.status(400).json({ error: true, message: "Invalid password. Must be at least 4 characters long." });
    }

    if (firstName !== undefined && firstName.trim() === "") {
        return res.status(400).json({ error: true, message: "First name cannot be empty." });
    }

    if (lastName !== undefined && lastName.trim() === "") {
        return res.status(400).json({ error: true, message: "Last name cannot be empty." });
    }

    next();
};

export {createUserValid, updateUserValid};
