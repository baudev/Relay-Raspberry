const winston = require('winston');
/**
 * Log Class based on https://github.com/winstonjs/winston
 */
let options = {
    file: {
        level: 'info',
        filename: __dirname + '/../logs/relay.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ]
});
module.exports = logger;
