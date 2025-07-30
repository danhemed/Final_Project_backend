import { Controller, Get, Body, Post, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
    export class AuthController {
        constructor(private authService: AuthService) { }

        @HttpCode(HttpStatus.OK)
        @Post('login')
        singIn(@Body() signInDto: Record<string, any>) {
            return this.authService.signIn(signInDto.username, signInDto.password);
        }

        @UseGuards(AuthGuard)
        @Get('profile')
        getProfile(@Request() req: any) {
            return req.user;
        }
    }
