// src/users/users.repository.ts

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Local User interface that mirrors `prisma/schema.prisma`'s User model.
// This avoids depending on generated Prisma types (useful when the client hasn't been generated yet).
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  dateOfBirth?: Date | null;
  gender?: string | null;
}

// Define the shape of data required for creating a new user (excluding id and dates)
export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'isVerified'>;

@Injectable()
export class UsersRepository {
  private prisma = new PrismaClient(); // In a real NestJS app, this would be injected via a PrismaModule

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