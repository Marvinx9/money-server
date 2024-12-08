import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/shared/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controller/auth.controller';
import { AuthService } from './login/auth.service';
import { ValidateUserService } from './validateUser/validateUser.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { ValidateUserRepository } from '../repository/validateUser.repository';

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' },
        }),
        PassportModule,
        JwtModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        ValidateUserService,
        JwtStrategy,
        LocalStrategy,
        ValidateUserRepository,
    ],
    exports: [AuthService, ValidateUserService],
})
export class AuthServiceModule {}
