import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { PayloadI } from 'src/interfaces/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,

        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET'),
            ignoreExpiration: false, 
        });
    }
    async validate(payload: PayloadI) {
        console.log('payload found in req ', payload)
        console.log('payload.usename', payload.user.username)
        const user = await this.userRepository.findOne({
            where: {username: payload.user.username}
        })

        if (user) {
            delete user.password;
            delete user.salt;
            console.log('hello from validate', user)
            return user;
        } else{

            throw new UnauthorizedException()
        }
 
    }
}
