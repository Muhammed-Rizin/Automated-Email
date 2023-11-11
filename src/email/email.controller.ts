import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express'
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(
        private _emailService : EmailService
    ){}

    // POST /email/send
    @Post('send')
    sendEmail(
        @Body('to') to : string,
        @Body('id') id : string,
        @Res() res : Response
    ){
        return this._emailService.sendMail(to, id, res)
    }

    @Get('history')
    history(
        @Res() res : Response
    ){
        return this._emailService.getHistory(res)
    } 
}
