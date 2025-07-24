import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as Boom from '@hapi/boom';
import { CreateAuthorDto, CreateAuthorZodSchema } from '../author/dto/create-author.dto';
import { LoginAuthorDto } from '../author/dto/login-author.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  async signup(dto: CreateAuthorDto) {
    // ✅ Validate DTO
    try {
      CreateAuthorZodSchema.parse(dto);
    } catch (err: any) {
      throw Boom.badRequest(err.errors?.[0]?.message || 'Invalid input');
    }

    // ✅ Optional: Redundant check (can be removed if Zod ensures it)
    if (dto.password.length < 8) {
      throw Boom.badRequest('Password should be at least 8 characters');
    }

    // ✅ Check for duplicates
    const existingByName = await this.authRepo.findByName(dto.name);
    if (existingByName) throw Boom.conflict('Author with this name already exists');

    const existingByEmail = await this.authRepo.findByEmail(dto.email);
    if (existingByEmail) throw Boom.conflict('Author with this email already exists');

    // ✅ Hash and save
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

    const token = jwt.sign({ id: author.id, email: author.email }, 'your_jwt_secret', {
      expiresIn: '1h',
    });

    const decoded = jwt.decode(token);
    console.log('Decoded JWT payload:', decoded);

    return { access_token: token };
  }
}
