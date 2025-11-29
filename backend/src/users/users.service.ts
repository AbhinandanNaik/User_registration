import { Injectable } from '@nestjs/common';
import { UsersRepository, CreateUserDto, User } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findByEmail(email);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.usersRepository.create(createUserDto);
    }

    async findById(id: string): Promise<User | null> {
        return this.usersRepository.findById(id);
    }
}
