import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DbService) {
    User.initialize(this.dbService.getSequelize());
  }

  async create(dto: CreateUserDto): Promise<User> {
    return await User.create({...dto});
  }

  async findAll(): Promise<User[]> {
    return await User.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return await User.findByPk(id);
  }

  async update(id: number, updateDto: UpdateUserDto): Promise<User | null> {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(updateDto);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }
}
