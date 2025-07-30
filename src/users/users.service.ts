import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            username: 'dan',
            password: '1234',
            role: 'commander',
        },
        {
            id: 2,
            username: 'meni',
            password: '5555',
            role: 'soldier',
        },
    ];

    async create(user: any): Promise<User | undefined> {
        const newUser = {
            id: user.id,
            username: user.username,
            password: user.password,
            role: user.role,
        };
        this.users.push(newUser);
        return newUser;
    }

    async findAll(): Promise<User | undefined> {
        return this.users;
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async update(username: string, updateUser: any): Promise<User | undefined> {
        const user = this.findOne(username);
        if (user) {
            Object.assign(user, updateUser);
        }
        return user;
    }

    async delete(username: string): Promise<User | undefined> {
        this.users = this.users.filter(user => user.username !== username);
        return { deleted: true };
    }
}
