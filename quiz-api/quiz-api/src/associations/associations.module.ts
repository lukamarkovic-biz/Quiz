import { Module } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from 'src/entities/association.entity';
import { AssociationsController } from './associations.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Association]),
  JwtModule.register({
    secret: jwtConstants.secret, // Zameni sa svojim secretom iz ENV
    signOptions: { expiresIn: '60m' },  // Primer opcije
  }),
  ],
  controllers: [AssociationsController],
  providers: [AssociationsService],
})
export class AssociationsModule {
}
