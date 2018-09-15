import * as ErrorService from '../../services/error.service';
import { globalErrorHandler } from '../../services/error.service';
import UnauthorizedError from '../../domain/error/unauthorized.error';

import {UserService} from "../../services/antwerpen.user.service";

export default function (req, res, next) {
    if(req.headers.authorization === undefined || req.headers.amaprofiletype === undefined) {
        return ErrorService.globalErrorHandler(res, new UnauthorizedError());
    }

    // validate the user token
    req.headers.authorization = req.headers.authorization.replace('bearer ','');
    UserService.fetchUserInfo(req.headers.amaprofiletype, req.headers.authorization)
    .then(response => {
        req.user = response.data;
        req.user.type = req.headers.amaprofiletype;

        next();
    })
    .catch(err => ErrorService.globalErrorHandler(res, new UnauthorizedError()));
}
