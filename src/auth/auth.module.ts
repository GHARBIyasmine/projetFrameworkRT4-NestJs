import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from '../users/users/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users/users.module';

@Module({
    imports: [
      PassportModule.register( {
        defaultStrategy: 'jwt'
      }),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '10000s',
          },
        }),
      }),
    ],
    providers: [AuthService, JwtAuthGuard],
    exports: [AuthService] // Export AuthService
})
export class AuthModule {}
