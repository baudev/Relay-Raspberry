/**
 * Log Class based on Simple-Node-Logger package : https://www.npmjs.com/package/simple-node-logger
 */
export default class Log {
    
    static opts = {
        errorEventName: 'error',
        logDirectory: '/var/log', // NOTE: folder must exist and be writable...
        fileNamePattern: 'RELAY-<DATE>.log',
        dateFormat: 'YYYY.MM'
    };

    static log = require('simple-node-logger').createRollingFileLogger(Log.opts);

    /**
     * Logs for info mode. This is the default mode.
     * @param msg
     */
    static info (msg:string) {
        console.log(msg);
        Log.log.info(msg);
    }

    /**
     * Logs for debug mode.
     * @param msg
     */
    static debug (msg:string) {
        console.debug(msg);
        Log.log.debug(msg);
    }

    /**
     * Enables the debug mode. It means all debug logs will be saved.
     * @param value
     */
    static enableDebugMode(value: boolean){
        if(value === true) {
            Log.log.setLevel('debug');
        }
    }
}
