import { Controller, Get, Logger, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return 'dwapi MGS v01JUN202001...';
    }

    @Get('migration')
    getLib(@Res() res): string {
        Logger.log(__dirname + '/wwwroot/mgs.js');
        return res.sendFile(__dirname + '/wwwroot/mgs.js');
    }
}
