import { logger } from '../../utils/logger.utils';
import { bufferToString } from '../../utils/conversion.utils';
import { getUrlFromRequest } from '../../utils/express.utils';
import { isEmptyObject } from '../../utils/assert.utils';
import config from "../../config/config.json";

export default function (req, res, next) {
    if(!config.log.enable) {
        return next();
    }

    logger.verbose('');
    logger.verbose('### Incoming request ###');
    logger.verbose('');

    logger.verbose(`${req.method}: ${getUrlFromRequest(req)}`);

    logger.verbose('');

    for (let header in req.headers) {
        logger.verbose(`${header}: ${req.header(header)}`);
    }

    if (req.body instanceof Buffer) {
        logger.verbose('');
        logger.verbose(bufferToString(req.body));
    } else if(!isEmptyObject(req.body)) {
        logger.verbose('');
        logger.verbose(typeof req.body === 'object' ? JSON.stringify(req.body, null, 10) : req.body);
    }

    next();
}
