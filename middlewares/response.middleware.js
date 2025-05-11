const responseMiddleware = (req, res, next) => {
    // TODO: Implement middleware that returns result of the query
    if (res.data) {
        return res.status(200).json(res.data);
    }
    if (res.data === null) {
        return res.status(404).json({
            error: true,
            message: "Not found"
        });
    }

    if (res.err) {
        const message = res.err instanceof Error ? res.err.message : String(res.err);
        return res.status(400).json({
            error: true,
            message
        });
    }

    next();
}

export {responseMiddleware};
