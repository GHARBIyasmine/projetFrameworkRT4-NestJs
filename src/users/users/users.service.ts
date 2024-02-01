
import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CrudService } from 'src/common/crud/crud.service';
import { UserEntity } from './entities/user.entity';
import { UserI } from './user.interface';
import { AuthService } from 'src/auth/services/auth.service';
import { PayloadI } from 'src/interfaces/payload.interface';
import { UpdateUserDto } from './dto/update-user.dto';

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
    

      
      async updatePassword(userId: number, newPassword: string): Promise<UserEntity> {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        const salt = user.salt;
        user.password = await bcrypt.hash(newPassword, salt);
        
        return this.usersRepository.save(user);
      } 
       
      async updateUserProfileImage(userId : number, imageBuffer: Buffer): Promise<UserI> {
        console.log("this is the image buffer in service", imageBuffer)
        const userEntity: UserI = await this.usersRepository.findOne({
          where: { id: userId },
        });
    
        userEntity.profileImage = imageBuffer;
        return this.usersRepository.save(userEntity);
        
      }

      async updateUser(id: number, updatedUser: UpdateUserDto): Promise<UserEntity> {
        const newUser = await this.usersRepository.preload({
          id,
          ... updatedUser
        });
        if(! newUser) {
          throw new NotFoundException('');
        }
        return this.usersRepository.save(newUser);
     
      }
      
 
     async getUserProfileImage(user: UserEntity) {
        const userEntity: UserI = await this.usersRepository.findOne({
          where: { id: user.id },
        });
        const userImage = userEntity.profileImage;
        if (!userImage) {
          throw new HttpException('No image found', HttpStatus.NOT_FOUND);
        }
        console.log(userEntity.profileImage)
        return userEntity.profileImage;
      }

      async getUsername(user: UserEntity) {
        const userEntity: UserI = await this.usersRepository.findOne({
          where: { id: user.id },
        });
        const username = userEntity.username;
        if (!username) {
          throw new HttpException('No username found', HttpStatus.NOT_FOUND);
        }
        return username;
      }

      async getUserDetails(user: UserEntity) {
        const userE: UserI = await this.usersRepository.findOne({
          where: { id: user.id },
        });
        if (!userE) {
          throw new HttpException('No user details found', HttpStatus.NOT_FOUND);
        }
        const userDetails = {
          "id" : userE.id,  
          "username" : userE.username,
          "email" : userE.email,
          "imageUrl": userE.profileImage

        }
        return userDetails;
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


      async removeProfileImage(user: UserEntity) {
        const u: UserI = await this.usersRepository.findOne({
          where: { id: user.id },
        });
        u.profileImage = null;
        return this.usersRepository.save(u);
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


}
