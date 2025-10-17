// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { RegisterDto } from './dto/register.dto';

// Define the expected structure for a user logging in
export interface LoginDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  // Inject the UsersRepository and JwtService
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  // 1. Password Hashing (Used during Sign-up)
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
    return bcrypt.hash(password, saltRounds);
  }

  // 2. Password Comparison (Used during Login)
  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  
  // 3. Generate JWT Token
  private async generateToken(user: { id: string, email: string }): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    // This token is signed with JWT_SECRET_ACCESS_TOKEN from .env
    return this.jwtService.sign(payload); 
  }

  // 4. Sign Up Logic
  async register(registerDto: RegisterDto) {
    // 🛑 Production Check: Check if user already exists
    const existingUser = await this.usersRepository.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists.');
    }

    // Hash the plain text password provided in the DTO
    const passwordHash = await this.hashPassword(registerDto.password);

    // Create the user in the database (map DTO -> repository shape)
    const user = await this.usersRepository.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      passwordHash,
    });

    // Generate a token for the newly registered user
    const token = await this.generateToken(user);

    // Return token and basic user info (excluding the password hash)
    const { passwordHash: _, ...result } = user;
    return {
      user: result,
      token,
      message: 'Registration successful. Email verification needed.',
    };
  }
  
  // 5. Login Logic
  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findByEmail(loginDto.email);
    
    // 🛑 Production Check 1: User existence check
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    
    // 🛑 Production Check 2: Password comparison
    const isMatch = await this.comparePassword(loginDto.password, user.passwordHash);
    if (!isMatch) {
      // Use generic message to prevent exposing whether the email or password was wrong
      throw new UnauthorizedException('Invalid credentials.'); 
    }
    
    // 🛑 Production Check 3: Account verification status (optional)
    if (!user.isVerified) {
        throw new UnauthorizedException('Account not verified. Check your email.');
    }

    // Generate token and return success
    const token = await this.generateToken(user);
    
    const { passwordHash: _, ...result } = user;
    return { 
        user: result, 
        token 
    };
  }
}