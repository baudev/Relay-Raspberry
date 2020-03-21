declare const winston: any;
/**
 * Log Class based on https://github.com/winstonjs/winston
 */
declare let options: {
    file: {
        level: string;
        filename: string;
        handleExceptions: boolean;
        json: boolean;
        maxsize: number;
        maxFiles: number;
        colorize: boolean;
    };
    console: {
        level: string;
        handleExceptions: boolean;
        json: boolean;
        colorize: boolean;
    };
};
declare const logger: any;
