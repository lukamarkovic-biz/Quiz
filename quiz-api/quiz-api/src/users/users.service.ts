import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    public getAll() {
        return this.usersRepository.find();
    }

    public getById(id: number){
        return this.usersRepository.findOne({where: {id}});
    }

    public findOnebyEmail (email : string) {
        return this.usersRepository.findOne({where: {email}})
    }

    public findOneByUsername (username: string) {
        return this.usersRepository.findOne({where: {username}})
    }

    public async create(user: User){
      return await this.usersRepository.save(user);
    }

    async register(username: string, email: string, password: string): Promise<User> {
        const existingUserByUsername = await this.findOneByUsername(username);
        const existingUserByEmail = await this.findOnebyEmail(email);
        
        if (existingUserByUsername) {
          throw new ConflictException('Username already registered');
        }
      
        if (existingUserByEmail) {
          throw new ConflictException('Email already registered');
        }
      
        const newUser = this.usersRepository.create({ username, email, password });
      
        try {
          return await this.usersRepository.save(newUser);
        } catch (error) {
          if (error.code === '23505') {
            throw new ConflictException('Username or email already registered');
          }
          throw error;
        }
      }

}
