import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) { }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');
    return bcrypt.hash(password, saltRounds);
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private async generateToken(user: { id: string, email: string }): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersRepository.findByEmail(registerDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists.');
    }

    const passwordHash = await this.hashPassword(registerDto.password);

    const user = await this.usersRepository.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      passwordHash,
      dateOfBirth: new Date(registerDto.dateOfBirth),
      gender: registerDto.gender,
    });

    const token = await this.generateToken(user);

    const { passwordHash: _, ...result } = user;
    return {
      user: result,
      token,
      message: 'Registration successful.',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isMatch = await this.comparePassword(loginDto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    if (!user.isVerified) {
      // throw new UnauthorizedException('Account not verified. Check your email.');
      // For now, allow login even if not verified or auto-verify
    }

    const token = await this.generateToken(user);

    const { passwordHash: _, ...result } = user;
    return {
      user: result,
      token,
      message: 'Login successful',
    };
  }
}