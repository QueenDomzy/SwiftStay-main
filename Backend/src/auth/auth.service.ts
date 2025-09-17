import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  // Register a new user
  async register(email: string, password: string) {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user in database
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      return { message: 'User registered successfully', user };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Validate user login
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }
  }
