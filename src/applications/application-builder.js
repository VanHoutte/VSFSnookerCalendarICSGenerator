import express from "express";
import http from "http";
import https from "https";
import Application from "./application";
import config from "../config/config";
import fs from "fs";

export class ApplicationBuilder {
	_application;

	constructor(name) {
		this._application = new Application(express(), name);

		if (config.ssl && config.ssl.active) {
			let options = {
				key: fs.readFileSync(config.ssl.keyPath),
				cert: fs.readFileSync(config.ssl.certPath),
				ca: config.ssl.caPath ? fs.readFileSync(config.ssl.caPath) : null
			};
			this._application.instance.server = https.createServer(options, this._application.instance);
		} else {
			this._application.instance.server = http.createServer(this._application.instance);
		}
	}

	addFeature(feature) {
		this._application.instance.use(feature);
		return this;
	}

	addRoutes(routePrefix, routes) {
		this._application.instance.use(routePrefix, routes);
		return this;
	}

	addSeeder(seeder) {
		this._application.seeders.push(seeder);
		return this;
	}

	registerCronJob(cronjob) {
		this._application.cronJobs.push(cronjob);
		return this;
	}

	build() {
		return this._application;
	}
}
