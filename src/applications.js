import { ApplicationBuilder } from "./applications/application-builder";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import middleware from "./api/middleware/index";
import generalRoutes from "./api/routes/general.routes";
import apiV1Routes from "./api/routes/rest.routes";
import config from "./config/config.json";
import serveStatic from "serve-static";
import Application from "./applications/application";
import { IpFilter } from "express-ipfilter";

require("babel-core/register");
require("babel-polyfill");

const projectRoot = __dirname + "/..";

export let ApplicationType = {
	rest: "rest"
};

export function determineApplicationType() {
	let app = Object.keys(ApplicationType).find((key) => ApplicationType[key] === Application.parseEnv().type);

	if (!app) {
		throw new Error("No valid ApplicationType found, check the source code for valid values.");
	}

	return app;
}

export function initializeApplication(type) {
	type = determineApplicationType(type);

	switch (type) {
		case ApplicationType.rest:
			return initRestApplication();
	}
}

export function initRestApplication() {
	let builder = new ApplicationBuilder(ApplicationType.rest)
		.addFeature(
			cors({
				exposedHeaders: config.corsHeaders
			})
		)
		.addFeature(
			bodyParser.json({
				limit: config.bodyLimit
			})
		)
		.addFeature(middleware())
		.addRoutes("/documentation", serveStatic(`${projectRoot}/documentation`))
		.addRoutes("/", serveStatic(`/usr/src/app/build`))
		.addRoutes("/", generalRoutes())
		.addRoutes("/api/v1", apiV1Routes());

	if (config.log.express) {
		builder.addFeature(morgan("dev"));
	}

	if (config.environment != "production" || config.environment != "prod") {
		builder.addRoutes("/logs", serveStatic(`${projectRoot}/logs/log.log`));
	}

	return builder.build();
}
