import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TermsModule } from './terms/terms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Term } from './entities/term.entity';
import { ColumnsModule } from './columns/columns.module';
import { AsColumn } from './entities/column.entity';
import { AssociationsModule } from './associations/associations.module';
import { Association } from './entities/association.entity';
import { AnswersModule } from './answers/answers.module';
import { Answer } from './entities/answer.entity';
import { QuestionsModule } from './questions/questions.module';
import { Question } from './entities/question.entity';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { HighscoresModule } from './highscores/highscores.module';
import { Highscore } from './entities/highscore.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [TermsModule, ColumnsModule, AssociationsModule,
    AnswersModule,  QuestionsModule, UsersModule, AuthModule, HighscoresModule,
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass',
    entities: [Term, AsColumn, Association, Answer, Question, User, Highscore],
    synchronize: true,
    database: 'slagalica'
}),
  JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '60m' }, // Token ističe za 60 minuta
}),
],
  controllers: [AppController, AuthController],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
