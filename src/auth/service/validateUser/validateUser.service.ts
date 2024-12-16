import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ValidateUserRepository } from '../../repository/validateUser.repository';

@Injectable()
export class ValidateUserService {
    constructor(private validateUserRepository: ValidateUserRepository) {}

    async execute(username: string) {
        const user = await this.validateUserRepository.findByUsername(username);

        if (!user) {
            throw new UnauthorizedException('Usuário ou senha incorretos!');
        }
        return user;
    }
}
