import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signIn(id: number, pass: string
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(id);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, name: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
