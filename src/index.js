import config from "./config/config.json";
import { logger } from "./utils/logger.utils";
import { initializeApplication } from "./applications";

require("babel-core/register");
require("babel-polyfill");

let app = null;
onBootstrapped();

function onBootstrapped() {
	app = initializeApplication();
	app.instance.server.listen(app.env.port, () => {
		logger.info(`Started on port ${app.instance.server.address().port}`);
	});
}

export default app;
