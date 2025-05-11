import {Router} from "express";
import {userService} from "../services/userService.js";
import {
    createUserValid,
    updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get("/", async (req, res, next) => {
    try {
        const data = await userService.getAll();
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
},responseMiddleware)

router.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = await userService.getOneById(id);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post("/", createUserValid, async (req, res, next) => {
    try {
        const {firstName, lastName, email, phone, password} = req.body;
        const data = await userService.createNewUser({firstName, lastName, email, phone, password});
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.delete("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = await userService.deleteById(id);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.patch("/:id", updateUserValid, async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = await userService.updateById(id, req.body);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);
export {router};
