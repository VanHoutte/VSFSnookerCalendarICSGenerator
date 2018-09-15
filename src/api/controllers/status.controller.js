import { version } from "../../../package.json";
import { defaultLang, environment } from "../../config/config.json";

/**
 * @apiDescription Gets all countries
 *
 * @api {GET} /api/v1/ Get API status
 * @apiName getStatus
 * @apiGroup Status
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success example
 * {
 *   "environment": "development",
 *   "version": "0.0.1",
 *   "defaultLang":"en"
 * }
 *
 * @apiSuccess (Success) {Object} 200 Status is shown.
 */
export function status(req, res) {
	res.json({
		environment: environment,
		version: version,
		defaultLang: defaultLang
	});
}
