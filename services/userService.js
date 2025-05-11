import {userRepository} from "../repositories/userRepository.js";
import {validateUniqueUser} from "../validators/validateUniqueUser.js";

class UserService {
    // TODO: Implement methods to work with user

    search(search) {
        const item = userRepository.getOne(search);
        if (!item) {
            return null;
        }
        return item;
    }

    async getAll() {
        const item = await userRepository.getAll();
        if (!item) {
            throw Error("Users not found");
        }
    }

    async getOneById(id) {
        const item = await userRepository.getOne(id);
        if (!item) {
            return null;
        }
        return item;
    }

    async createNewUser(data) {
        await validateUniqueUser(data);
        return userRepository.create(data);
    }

    async deleteById(id) {
        const item = await userRepository.delete(id);
        if (!item) {
            throw Error("User not found");
        }
        return item;
    }

    async updateById(id, data) {
        await validateUniqueUser(data);
        const item = await userRepository.update(id, data);
        if (!item) {
            throw Error("User not found");
        }
        return item;
    }
}

const userService = new UserService();

export {userService};
