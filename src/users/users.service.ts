import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
    private users: UserDto[] = [];

    create(UserDto: UserDto) {
        const newUser = {
            id: Date.now(),
            name: UserDto.name,
            password: UserDto.password,
            role: UserDto.role,
        };
        this.users.push(newUser);
        return newUser;
    }

    findAll() {
        return  this.users;
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id);
    }

    update(id: number, updateUserDto: any) {
        const user = this.findOne(id);
        if (user) {
            Object.assign(user, updateUserDto);
        }
        return user;
    }

    delete(id: number) {
        this.users = this.users.filter(user => user.id !== id);
        return { deleted: true };
    }
}
