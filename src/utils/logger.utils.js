import winston from 'winston';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import config from '../config/config.json';

const LogLevel = {
    error: 'error',
    warn: 'warn',
    info: 'info',
    verbose: 'verbose',
    debug: 'debug'
};

const Settings = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4
    },
    colors: {
        error: 'red',
        warn: 'orange',
        info: 'blue',
        verbose: 'magenta',
        debug: 'green'
    }
};

const loggingFormat = winston.format.printf(function (info) {
    return `(${moment().format('DD-MM-YYYY HH:mm:ss.SSS')}) ${info.level}: ${info.message}`;
});

class Logger {

    instance;

    constructor() {
        this.bootstrap();
    }

    bootstrap() {
        Logger.createLogDir();
        this.instance = winston.createLogger({
            levels: Settings.levels,
            format: winston.format.simple(),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize({all: true}),
                        loggingFormat
                    ),
                    level: config.log.level
                }),
                new winston.transports.File({
                    filename: path.join(config.log.dir, config.log.filename),
                    format: winston.format.combine(
                        loggingFormat 
                    ),
                    level: config.log.level
                }),
            ]
        });
        winston.addColors(Settings);
    }

    static createLogDir() {
        if (!fs.existsSync(config.log.dir)) {
            fs.mkdirSync(config.log.dir);
        }
    }

    error(text, params) {
        this.instance.log(LogLevel.error, text, params);
    }

    warn(text, params) {
        this.instance.log(LogLevel.warn, text, params);
    }

    info(text, params) {
        this.instance.log(LogLevel.info, text, params);
    }

    verbose(text, params) {
        this.instance.log(LogLevel.verbose, text, params);
    }

    debug(text, params) {
        this.instance.log(LogLevel.debug, text, params);
    }
}

export let logger = new Logger();
