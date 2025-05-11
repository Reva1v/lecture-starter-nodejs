import {fighterRepository} from "../repositories/fighterRepository.js";

export const validateUniqueFighter = async (data) => {
    const {name} = data;
    const isNotUniqName = await fighterRepository.getOne({name});

    if (isNotUniqName) {
        throw Error("Fighter with this name already exists");
    }
}
