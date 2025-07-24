import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthorDto, CreateAuthorZodSchema } from '../author/dto/create-author.dto';
import { LoginAuthorDto, LoginAuthorZodSchema } from '../author/dto/login-author.dto';
import { internal, badRequest } from '@hapi/boom';
import { ZodError } from 'zod';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateAuthorDto) {
    try {
      return this.authService.signup(body);
    } catch (err) {
      throw internal('Unexpected error');
    }
  }

  @Post('login')
  async login(@Body() body: any) {
    try {
      const dto: LoginAuthorDto = LoginAuthorZodSchema.parse(body);
      return this.authService.login(dto);
    } catch (err) {
      if (err instanceof ZodError) {
        throw badRequest(err.errors[0].message);
      }
      throw internal('Unexpected error');
    }
  }
}
