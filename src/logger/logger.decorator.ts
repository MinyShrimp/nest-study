import { Injectable, NestMiddleware } from "@nestjs/common";
import { LoggerService } from "./logger.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor() {}

    use(req: Request, res: Response, next: Function) {
        const loggerService = new LoggerService(req.url.slice(1).split('/')[0]);
        const tempUrl = req.method + ' ' + req.url.split('?')[0];
        const _headers = JSON.stringify(req.headers ?? {});
        const _body    = JSON.stringify(req.body ?? {});
        const _url     = JSON.stringify(tempUrl ?? {});

        loggerService.log(`${_url} ${_headers} ${_body}`.replace(/\\/, ''));
        next();
    }
}