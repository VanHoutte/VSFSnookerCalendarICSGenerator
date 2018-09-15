import { globalErrorHandler } from '../../services/error.service';
import i18next from 'i18next';
import ValidationError from '../../domain/error/validation.error';
import { sanitizeArray } from '../../utils/array.utils';


export default function (validContentTypes) {
    return function (req, res, next) {
        let contentTypeKey = Object.keys(req.headers).find(key => key.toLowerCase() === 'content-type');

        validContentTypes = sanitizeArray(validContentTypes);

        if (!contentTypeKey || !req.header(contentTypeKey) || !validContentTypes.includes(req.header(contentTypeKey))) {
            const error = new ValidationError(i18next.t('validation.incorrectContentType', {contentType: validContentTypes}));
            return globalErrorHandler(res, error);
        }

        next();
    };
}
