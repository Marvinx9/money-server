import { Module } from '@nestjs/common';
import { CreateUserRepository } from './createUser/repositories/createUser.repository';
import { CreateUserService } from './createUser/service/createUser.service';
import { UserController } from '../controllers/user.controller';
import { DatabaseModule } from 'src/shared/database/database.module';
@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [CreateUserService, CreateUserRepository],
})
export class UserServiceModule {}
