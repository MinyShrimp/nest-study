import { LoggerService as LS } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as moment from "moment";

const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;

export class LoggerService implements LS {
    private logger: winston.Logger;

    constructor(service) {
        this.logger = winston.createLogger({
            format: combine(
                errors({ stack: true }),
                json(),
                timestamp({ format: 'isoDateTime '}),
                ms(),
                prettyPrint()
            ),
            defaultMeta: { service },
            transports: [
                new winston.transports.File({
                    level: "error",
                    filename: `error-${moment(new Date()).format('YYYY-MM-DD')}.log`,
                    dirname: "logs",
                    maxsize: 5000000,
                }),
                new winston.transports.Console({
                    level: "debug",
                    format: combine(nestWinstonModuleUtilities.format.nestLike()),
                }),
                new winston.transports.File({
                    filename: `application-${moment(new Date()).format('YYYY-MM-DD')}.log`,
                    dirname: "logs",
                    maxsize: 5000000,
                })
            ]
        });

        console.log = (msg: any, params?: any) => {
            this.logger.debug(msg, params);
        };
    }

    log(msg: string) {
        this.logger.info(msg);
    }

    error(msg: string, trace: string) {
        this.logger.error(msg, trace);
    }

    warn(msg: string) {
        this.logger.warning(msg);
    }

    debug(msg: string) {
        this.logger.debug(msg);
    }

    verbose(msg: string) {
        this.logger.verbose(msg);
    }
}
