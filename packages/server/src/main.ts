import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
    const config = new ConfigService(`${process.env.NODE_ENV}.env`);

    const httpsOptions = {
        key: fs.readFileSync(`./secrets/${config.SslKey}`),
        cert: fs.readFileSync(`./secrets/${config.SslCert}`),
    };
    const app = await NestFactory.create(AppModule, { httpsOptions });

    Logger.log(`starting in ${process.env.NODE_ENV} mode`);
    app.enableCors();
    await app.listen(config.Port);
}
bootstrap();
