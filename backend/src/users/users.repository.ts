import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User as PrismaUser, Prisma } from '@prisma/client';

export type User = PrismaUser;
export type CreateUserDto = Prisma.UserCreateInput;

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) { }

  // 1. Find a user by their unique email
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // 2. Create a new user record
  async create(userData: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: userData,
    });
  }

  // 3. Find a user by their ID
  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}