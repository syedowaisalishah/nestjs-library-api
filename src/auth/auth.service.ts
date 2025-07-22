// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as Boom from '@hapi/boom';
import { CreateAuthorDto } from '../author/dto/create-author.dto';
import { LoginAuthorDto } from '../author/dto/login-author.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  async signup(dto: CreateAuthorDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const author = await this.authRepo.validateAndCreateAuthor(dto, hashed);
    return { message: 'Author registered successfully', authorId: author.id };
  }

  async login(dto: LoginAuthorDto) {
    const author = await this.authRepo.findByEmail(dto.email);
    if (!author) throw Boom.unauthorized('Invalid email or password');

    const isMatch = await bcrypt.compare(dto.password, author.password);
    if (!isMatch) throw Boom.unauthorized('Invalid email or password');

    const token = jwt.sign({ id: author.id, email: author.email }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    return { access_token: token };
  }
}
