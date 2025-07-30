import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() User: User) {
        return this.usersService.create(User);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':username')
    findOne(@Param('username') username: string) {
        return this.usersService.findOne(username);
    }

    @Put(':username')
    update(@Param('username') username: string, @Body() body: any) {
        return this.usersService.update(username, body);
    }

    @Delete(':username')
    delete(@Param('username') username: string) {
        return this.usersService.delete(username);
    }
}
