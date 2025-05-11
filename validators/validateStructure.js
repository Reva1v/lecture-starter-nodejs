export const validateStructure = (body, reference, requiredFields = []) => {
    const keys = Object.keys(reference);

    for (const key of Object.keys(body)) {
        if (!keys.includes(key)) {
            return `Unexpected field: "${key}"`;
        }
    }

    for (const key of requiredFields) {
        if (body[key] === undefined || body[key] === "") {
            return `Missing required field: "${key}"`;
        }
    }

    return null;
};
