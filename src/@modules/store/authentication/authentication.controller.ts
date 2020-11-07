import { Controller, Post, Get, Req, Res, Next, UseGuards, UnprocessableEntityException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { AuthenticationService } from './authentication.service';
import { IToken } from './interfaces/token.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthenticationService) { }

    @Get('local/signin')
    async signin(@Req() req: Request) {
        return 'tesitng'
    }
}
