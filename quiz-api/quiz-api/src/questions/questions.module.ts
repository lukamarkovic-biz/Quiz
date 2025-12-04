import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';


@Module({
    imports: [TypeOrmModule.forFeature([Question]),
    JwtModule.register({
        secret: jwtConstants.secret, // Zameni sa svojim secretom iz ENV
        signOptions: { expiresIn: '60m' },  // Primer opcije
      }),
    ],
    controllers: [QuestionsController],
    providers: [QuestionsService],
})
export class QuestionsModule {}
