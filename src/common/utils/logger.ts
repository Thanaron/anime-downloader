import winston from 'winston';
const { ConsoleForElectron } = require('winston-console-for-electron');
const { format } = require('logform');

const timestampFormat = format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' });

const fileTransport = new winston.transports.File({
    filename: 'app.log',
    maxsize: 10485760,
    maxFiles: 10,
});

const consoleTransport = new ConsoleForElectron({
    handleExceptions: true,
    format: format.combine(
        format.colorize({
            colors: {
                error: 'red',
                warn: 'yellow',
                info: 'blue',
                verbose: 'green',
                debug: 'cyan',
                silly: 'magenta',
            },
        }),
        format.splat(),
        format.printf((info: any) => `[${info.level}] ${info.message}`)
    ),
});

const fileFormat = format.combine(
    timestampFormat,
    format.splat(),
    format.printf(
        (info: any) => `[${info.timestamp}] [${info.level}] ${info.message}`
    )
);

const logger = winston.createLogger({
    level: 'debug',
    format: fileFormat,
    transports: fileTransport,
    exceptionHandlers: fileTransport,
    exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(consoleTransport);
}

function setLevel(newLevel: string) {
    logger.level = newLevel;
    fileTransport.level = newLevel;
    consoleTransport.level = newLevel;
    logger.log(newLevel, `Log level set to ${newLevel}`);
}

export default logger;
export { setLevel };
