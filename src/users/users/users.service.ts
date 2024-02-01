
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service';
import { UserEntity } from './entities/user.entity';
import { UserI } from './user.interface';
import { AuthService } from 'src/auth/services/auth.service';
import { PayloadI } from 'src/interfaces/payload.interface';
import { UserRoleEnum } from './entities/user-role.enum';

const bcrypt = require('bcrypt');
@Injectable()
export class UsersService extends CrudService<UserEntity>{
    constructor(
        @InjectRepository(UserEntity)

        private readonly usersRepository: Repository<UserEntity>,
        private readonly authService: AuthService,
      ) {
        super(usersRepository);
      }




      async create(entity: DeepPartial<UserEntity>): Promise<UserEntity> {
        const newUser = entity as UserI;
        const emailExists: boolean = await this.mailExists(newUser.email);
        const usernameExists: boolean = await this.usernameExists(newUser.username);

        if (emailExists === false && usernameExists === false) {
          newUser.salt = await bcrypt.genSalt()
          newUser.password = await bcrypt.hash(newUser.password, newUser.salt);
          newUser.email = newUser.email.toLowerCase();
          newUser.username = newUser.username.toLowerCase();

          const user = await this.usersRepository.save(
            this.usersRepository.create(newUser),
          );
          return this.findOne(user.id);
        } else {
          throw new HttpException(
            'Email or Username already taken',
            HttpStatus.CONFLICT,
          );
        }
      }


      async login(user: UserI): Promise<string> {
        const foundUser: UserI = await this.findByEmail(user.email);
        console.log('found user', foundUser)
    
        if (foundUser) {
          const passwordsMatching: boolean =
            await this.authService.comparePasswords(
              user.password,
              foundUser.password,
            );
    
          if (passwordsMatching === true) {
            
            const payload: PayloadI = {
              user: {
                username: foundUser.username,
              role: foundUser.role
              }
            };
            console.log(payload)
            return this.authService.generateJwt(payload.user);
          } else {
            throw new HttpException(
              'Login was not successfull, wrong credentials',
              HttpStatus.UNAUTHORIZED,
            );
          }
        } else {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
      }
    




      async getOneById(id: number): Promise<UserI> {
        return this.usersRepository.findOneOrFail({
          where: {
            id: id,
          },
        });
      }
    
      private async findByEmail(email: string): Promise<UserI> {
        return this.usersRepository.findOne({
          where: { email },
          select: ['id', 'email', 'password', 'username', 'role'],
        });
      }
    
      async findByUsername(username: string): Promise<UserI> {
        return this.usersRepository.findOne({
          where: { username },
          select: ['id', 'email', 'password', 'username'],
        });
      }

      async findFullUserByUsername(username: string): Promise<UserEntity>{
        return this.usersRepository.findOne({
          where: { username },
          
        });
      }



      private async mailExists(email: string): Promise<boolean> {
        const user = await this.usersRepository.findOne({
          where: { email },
        });
        return !!user;
      }
    
      private async usernameExists(username: string): Promise<boolean> {
        const user = await this.usersRepository.findOne({
          where: { username },
        });
        return !!user;
      }







      async findUserOwnedGroups(userId: number) {
        const user = await this.usersRepository.findOne({
          where: { id: userId },
          relations: ['ownedGroups'], 
          select: ['ownedGroups'],
        });
    
        return user?.ownedGroups;
      }



      isOwnerOrAdmin(objetOwner, user) {
        console.log(user.role === UserRoleEnum.ADMIN || (objetOwner && objetOwner.id === user.id));
        return user.role === UserRoleEnum.ADMIN || (objetOwner && objetOwner.id === user.id);
      }
}
