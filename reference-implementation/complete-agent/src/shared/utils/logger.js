/**
 * Logger Utility - Simple logging utility for the application
 */

class Logger {
    constructor(context = 'DWYAgent') {
        this.context = context;
    }

    info(message, ...args) {
        console.log(`[${new Date().toISOString()}] [INFO] [${this.context}] ${message}`, ...args);
    }

    warn(message, ...args) {
        console.warn(`[${new Date().toISOString()}] [WARN] [${this.context}] ${message}`, ...args);
    }

    error(message, ...args) {
        console.error(`[${new Date().toISOString()}] [ERROR] [${this.context}] ${message}`, ...args);
    }

    debug(message, ...args) {
        if (process.env.DEBUG === 'true') {
            console.debug(`[${new Date().toISOString()}] [DEBUG] [${this.context}] ${message}`, ...args);
        }
    }
}

function createLogger(context) {
    return new Logger(context);
}

module.exports = {
    Logger,
    createLogger
};