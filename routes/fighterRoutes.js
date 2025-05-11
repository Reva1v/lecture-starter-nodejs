import {Router} from "express";
import {fighterService} from "../services/fighterService.js";
import {responseMiddleware} from "../middlewares/response.middleware.js";
import {
    createFighterValid,
    updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get("/", async (req, res, next) => {
    try {
        const data = await fighterService.getAll();
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = await fighterService.getOneById(id);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.post("/", createFighterValid, async (req, res, next) => {
    try {
        const data = await fighterService.createNewFighter(req.body);
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
        const data = await fighterService.deleteById(id);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

router.patch("/:id", updateFighterValid, async (req, res, next) => {
    try {
        const {id} = req.params;
        const data = await fighterService.updateById(id, req.body);
        res.data = data;
    } catch (err) {
        res.err = err;
    } finally {
        next();
    }
}, responseMiddleware);

export {router};
