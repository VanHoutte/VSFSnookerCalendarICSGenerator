import Category from "../../models/category.model";

import {UserService} from "../../services/antwerpen.user.service";

import * as ErrorService from "../../services/error.service";
import EntityNotFoundError from "../../domain/error/entity-not-found.error";
import UnauthorizedError from "../../domain/error/unauthorized.error";

export default function(req, res, next) {
    // the req.models should contain the category
    if (!req.models || !req.models.category) {
        return ErrorService.globalErrorHandler(res, new EntityNotFoundError('Category'));
    }

    var category = req.models.category;

    if(req.headers.authorization === undefined) {
        if (!category.login_required) {
            return next();
        }

        if (category.login_required) {
            return ErrorService.globalErrorHandler(res, new UnauthorizedError())
        }
    }

    // validate the user token
    req.headers.authorization = req.headers.authorization.replace('bearer ', '');
    UserService.fetchUserInfo(req.headers.amaprofiletype, req.headers.authorization).then((response) => {
        if (!response.data) {
            return ErrorService.globalErrorHandler(res, new UnauthorizedError())
        }

        req.user = response.data;
        req.user.type = req.headers.amaprofiletype;

        next();
    }).catch(() => {
        if (!category.login_required) {
            return next();
        }

        return ErrorService.globalErrorHandler(res, new UnauthorizedError())
    });
}
