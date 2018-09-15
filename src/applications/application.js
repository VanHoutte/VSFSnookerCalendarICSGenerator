export default class Application {

    _instance;
    _name;
    _cronJobs;
    _seeders;
    _env;

    constructor(instance, name) {
        this._instance = instance;
        this._name = name;
        this._cronJobs = [];
        this._seeders = [];
        this._env = Application.parseEnv();
    }

    get instance() {
        return this._instance;
    }

    get name() {
        return this._name;
    }

    get cronJobs() {
        return this._cronJobs;
    }

    get seeders() {
        return this._seeders;
    }

    get services() {
        return this._services;
    }

    get env() {
        return this._env;
    }

    startCronJobs() {
        for (let cron of this._cronJobs) {
            cron.start();
        }
    }

    static parseEnv() {
        let env = {};
        for (let val of process.argv) {
            if (!val.includes('=')) { continue; }
            let keyValue = val.split('=');
            env[keyValue[0].replace('--', '')] = keyValue[1];
        }
        return env;
    }
}
