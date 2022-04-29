import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from "config";

async function bootstrap() {
    const serverConfig = config.get('server');

    const app = await NestFactory.create(AppModule);
    await app.listen(serverConfig.port);
    
    Logger.log(`Application running on port ${serverConfig.port}`)
}
bootstrap();
