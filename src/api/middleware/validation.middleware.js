import { globalErrorHandler } from '../../services/error.service';
import { validationResult } from 'express-validator/check';
import ValidationError from '../../domain/error/validation.error';
import EntityNotFoundError from '../../domain/error/entity-not-found.error';


export default function checkValidations(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let mappedErrors = errors.mapped();
        let containsParams = Object.keys(mappedErrors).filter(key => mappedErrors[key].location === 'params').length > 0;
        return globalErrorHandler(res, containsParams ? new EntityNotFoundError(mappedErrors) : new ValidationError(mappedErrors));
    }

    next();
}
