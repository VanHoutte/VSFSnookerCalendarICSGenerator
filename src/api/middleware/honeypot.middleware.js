export default function(formValue, responseStatus = 200) {
    return function(req, res, next) {
        // if the value is an empty string, we can process it
        if (req.body[formValue] === "") {
            return next()
        }

        return res.status(responseStatus).end();
    }
}
