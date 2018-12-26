const winston = require('winston');
const { ConsoleForElectron } = require('winston-console-for-electron');
const { format } = require('logform');

require('winston-daily-rotate-file');

const timestampFormat = format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' });

const fileTransport = new winston.transports.DailyRotateFile({
    filename: `application-%DATE%.log`,
    datePattern: 'YYYY-MM',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
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
    level: 'silly',
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
