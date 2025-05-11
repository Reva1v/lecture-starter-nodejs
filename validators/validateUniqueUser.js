import {userRepository} from "../repositories/userRepository.js";

export const validateUniqueUser = async (data) => {
    const {email, phone} = data;
    const isNotUniqEmail = await userRepository.getOne({email});
    const isNotUniqPhoneNumber = await userRepository.getOne({phone});

    if (isNotUniqEmail) {
        throw Error("User with this email already exists");
    }

    if (isNotUniqPhoneNumber) {
        throw Error("User with this phone number already exists");
    }
}
