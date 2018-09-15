export default function(multer) {
    return function(req, res, next) {
        multer(req, res, function(err) {
            if (err || !req.files || !req.files.length) {
                return next();
            }
            // we will move the files to the body, this way we can add a validator for the files
            req.body['files'] = req.files;
            delete req.files;

            next();
        })
    }
}
