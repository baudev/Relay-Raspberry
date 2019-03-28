/**
 * Log Class based on Simple-Node-Logger package : https://www.npmjs.com/package/simple-node-logger
 */
export class Log {
    
    static opts = {
        errorEventName: 'error',
        logDirectory: '/var/log', // NOTE: folder must exist and be writable...
        fileNamePattern: 'RELAY-<DATE>.log',
        dateFormat: 'YYYY.MM'
    };

    static log = require('simple-node-logger').createRollingFileLogger(Log.opts);

    static info (msg:string) {
        console.log(msg);
        Log.log.info(msg);
    }

    static debug (msg:string) {
        console.debug(msg);
        Log.log.debug(msg);
    }
}
