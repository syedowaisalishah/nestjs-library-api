import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthorDto } from '../author/dto/create-author.dto';
import { LoginAuthorDto } from '../author/dto/login-author.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
signup(@Body() body: CreateAuthorDto) {
  return this.authService.signup(body);
}

@Post('login')
login(@Body() body: LoginAuthorDto) {
  return this.authService.login(body);
}

}
