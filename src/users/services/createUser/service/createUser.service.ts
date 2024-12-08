import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserRepository } from '../repositories/createUser.repository';
import { CreateUserInputDto } from '../dto/createUserInput.dto';
import { v4 as uuidv4 } from 'uuid';

import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserService {
    constructor(private readonly createUserRepository: CreateUserRepository) {}

    async execute(data: CreateUserInputDto) {
        try {
            const usuario = await this.createUserRepository.verifyDuplicity(
                data.email,
            );

            if (usuario) {
                throw new BadRequestException(
                    'Usuário já criado com esse e-mail',
                );
            }

            data.password = await bcrypt.hash(data.password, 10);

            const id = uuidv4();

            await this.createUserRepository.createUser(id, data);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException(
                'Ocorreu um erro ao criar o usuário. Tente novamente!',
            );
        }
    }
}
