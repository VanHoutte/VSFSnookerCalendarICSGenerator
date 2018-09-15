import {PROFILETYPEENUM} from '../../domain/profiletype.domain';

// this middleware will conver the passed profiletype to an enum value
// if no typed is passed, we will set the default to a_profile
export default function(req, res, next) {
    if(!req.headers.authorization) {
        return next();
    }

    if (!req.headers.amaprofiletype) {
        req.headers.amaprofiletype = PROFILETYPEENUM.A_PROFILE
        return next();
    }

    if (!Object.keys(PROFILETYPEENUM).includes(req.headers.amaprofiletype)) {
        req.headers.amaprofiletype = PROFILETYPEENUM.A_PROFILE
        return next();
    }

    // convert to the correct type
    switch(req.headers.amaprofiletype) {
        case "A_PROFILE":
            req.headers.amaprofiletype = PROFILETYPEENUM.A_PROFILE
            return next();

        case "M_PROFILE":
            req.headers.amaprofiletype = PROFILETYPEENUM.M_PROFILE
            return next();
    }

    next();
}
