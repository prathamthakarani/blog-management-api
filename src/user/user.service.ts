import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user-repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async getUserById(userId: string): Promise<User> {
    const found = await this.userRepository.findOne(userId);

    if (!found) {
      throw new NotFoundException(`Task with id ${userId} is not found`);
    }

    return found;
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;

    return this.userRepository.save(user);
  }
  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    // console.log(result);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ${id} not found `);
    }
  }
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
