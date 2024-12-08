import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserService } from '../validateUser/validateUser.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../../dtos/currentUser.interface';
import { LoginOutputDto } from '../../dtos/loginOutput.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

describe('AuthService', () => {
    let sut: AuthService;
    let validateUserService: ValidateUserService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: ValidateUserService,
                    useValue: {
                        execute: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                    },
                },
            ],
        }).compile();

        sut = module.get<AuthService>(AuthService);
        validateUserService =
            module.get<ValidateUserService>(ValidateUserService);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('Should be defined', () => {
        expect(sut).toBeDefined();
        expect(validateUserService).toBeDefined();
        expect(jwtService).toBeDefined();
    });

    describe('login', () => {
        it('should return a valid LoginOutputDto', async () => {
            //Arrange
            const user: User = {
                id: '1',
                email: 'test@example.com',
                nome: 'Test User',
                perfil: 'user',
                password: 'hashedPassword',
            };

            const expectedResult: LoginOutputDto = {
                access_token: 'fakeToken',
                id: user.id,
                email: user.email,
                nome: user.nome,
            };

            jest.spyOn(jwtService, 'sign').mockReturnValue('fakeToken');

            //Act
            const result = await sut.login(user);

            //Assert
            expect(jwtService.sign).toHaveBeenCalledWith({
                sub: user.id,
                email: user.email,
                nome: user.nome,
            });
            expect(result).toEqual(expectedResult);
        });
    });

    describe('validateUser', () => {
        it('should return the user without the password if validation succeeds', async () => {
            //Arrange
            const user = {
                id: 1,
                email: 'test@example.com',
                nome: 'Test User',
                password: 'hashedPassword',
            };
            const password = 'plainPassword';

            jest.spyOn(validateUserService, 'execute').mockResolvedValue(user);

            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            //Act
            const result = await sut.validateUser(user.email, password);

            //Assert
            expect(validateUserService.execute).toHaveBeenCalledWith(
                user.email,
            );
            expect(bcrypt.compare).toHaveBeenCalledWith(
                password,
                user.password,
            );
            expect(result).toEqual({
                id: user.id,
                email: user.email,
                nome: user.nome,
            });
        });

        it('Should throw UnauthorizedException if user is not found', async () => {
            //Arrange
            jest.spyOn(validateUserService, 'execute').mockResolvedValue(null);

            //Act & Assert
            await expect(
                sut.validateUser('nonexistent@example.com', 'password'),
            ).rejects.toThrow(UnauthorizedException);
        });

        it('Should throw UnauthorizedException if password is incorrect', async () => {
            //Arrange
            const user = {
                id: 1,
                email: 'test@example.com',
                nome: 'Test User',
                password: 'hashedPassword',
            };
            jest.spyOn(validateUserService, 'execute').mockResolvedValue(user);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            //Act & Assert
            await expect(
                sut.validateUser(user.email, 'wrongPassword'),
            ).rejects.toThrow(UnauthorizedException);
        });
    });
});
