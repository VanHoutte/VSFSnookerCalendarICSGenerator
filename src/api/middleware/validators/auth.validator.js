import { body, header } from "express-validator/check";
import i18next from "i18next";
import {PROFILETYPEENUM} from '../../../domain/profiletype.domain';

export default class AuthValidator {
	static get refreshToken() {
		return [body("refresh_token").exists().withMessage(i18next.t("validation.requiredField", { field: "refreshToken" })).trim()];
	}

	static get accessCode() {
		return [
			body("access_code").exists().withMessage(i18next.t("validation.requiredField", { field: "access_code" })).trim()
		];
	}

	static get accessToken() {
		return [
			header("Authorization").exists().custom((value, {req}) => {
				var headers = req.headers;
				if (headers.amaprofiletype === undefined) {
					return false;
				}

				return (headers.amaprofiletype == PROFILETYPEENUM.A_PROFILE || headers.amaprofiletype == PROFILETYPEENUM.M_PROFILE);
			}).withMessage(i18next.t("validation.accessTokenProvideProfileType", {values: "M_PROFILE, A_PROFILE"}))
		];
	}
}
