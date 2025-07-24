// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as Boom from '@hapi/boom';
import { ConfigService } from '@nestjs/config';
import { CreateAuthorDto, CreateAuthorZodSchema } from '../author/dto/create-author.dto';
import { LoginAuthorDto } from '../author/dto/login-author.dto';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt'; // ✅ Add this import

@Injectable()
export class AuthService {
  constructor(
  private readonly authRepo: AuthRepository,
  private readonly configService: ConfigService,
  private readonly jwtService: JwtService, // ✅ Add this
) {}


  async signup(dto: CreateAuthorDto) {
    try {
      CreateAuthorZodSchema.parse(dto);
    } catch (err: any) {
      throw Boom.badRequest(err.errors?.[0]?.message || 'Invalid input');
    }

    if (dto.password.length < 8) {
      throw Boom.badRequest('Password should be at least 8 characters');
    }

    const existingByName = await this.authRepo.findByName(dto.name);
    if (existingByName) throw Boom.conflict('Author with this name already exists');

    const existingByEmail = await this.authRepo.findByEmail(dto.email);
    if (existingByEmail) throw Boom.conflict('Author with this email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const author = await this.authRepo.createAuthor({
      name: dto.name,
      email: dto.email,
      bio: dto.bio,
      password: hashed,
    });

    return { message: 'Author registered successfully', authorId: author.id };
  }

 async login(dto: LoginAuthorDto) {
  const author = await this.authRepo.findByEmail(dto.email);
  if (!author) throw Boom.unauthorized('Invalid email or password');

  const isMatch = await bcrypt.compare(dto.password, author.password);
  if (!isMatch) throw Boom.unauthorized('Invalid email or password');

  const payload = { id: author.id, email: author.email };
  const token = this.jwtService.sign(payload);

  console.log('Decoded JWT payload:', this.jwtService.decode(token));

  return { access_token: token };
}

}
