export default function(bodyProperty) {
    return function(req, res, next) {
        try {
            req.body[bodyProperty] = JSON.parse(req.body[bodyProperty]);
        } catch (e) {
            return next();
        }

        next();
    }
}
