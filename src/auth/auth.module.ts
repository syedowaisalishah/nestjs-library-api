import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule, //  required to use ConfigService
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
  const config = configService.get<JwtModuleOptions>('jwt');
  if (!config) {
    throw new Error('JWT config is undefined');
  }
  return config;
},

    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    PrismaService,
    JwtStrategy,
  ],
  exports: [AuthService], 
})
export class AuthModule {}
