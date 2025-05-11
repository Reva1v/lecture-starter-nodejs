import {fighterRepository} from "../repositories/fighterRepository.js";
import {validateUniqueFighter} from "../validators/validateUniqueFighter.js";

class FighterService {
    // TODO: Implement methods to work with fighters
    async getAll() {
        const item = await fighterRepository.getAll();
        if (!item) {
            throw Error("Fighters not found");
        }
        return item;
    }

    async getOneById(id) {
        const item = await fighterRepository.getOne(id);
        if (!item) {
            return null;
        }
        return item;
    }

    async createNewFighter(data) {
        await validateUniqueFighter(data);
        return fighterRepository.create(data);
    }

    async deleteById(id) {
        const item = await fighterRepository.delete(id);
        if (!item) {
            throw Error("Fighter not found");
        }
        return item;
    }


    async updateById(id, data) {
        await validateUniqueFighter(data);
        const item = await fighterRepository.update(id, data);
        if (!item) {
            throw Error("Fighter not found");
        }
        return item;
    }
}

const fighterService = new FighterService();

export {fighterService};
