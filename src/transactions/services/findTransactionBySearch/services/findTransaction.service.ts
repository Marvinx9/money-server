import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { FindTransactionRepository } from '../repository/findTransaction.repository';
import { FindTransactionInputDto } from '../dto/findTransactionInput.dto';

@Injectable()
export class FindTransactionService {
    private readonly logger = new Logger('FindTransactionService');

    constructor(
        private readonly findTransactionRepository: FindTransactionRepository,
    ) {}

    async execute(data: FindTransactionInputDto) {
        try {
            if (!data.usuario_id) {
                throw new BadRequestException('Usuário inválido!');
            }
            return await this.findTransactionRepository.findTransaction(data);
        } catch (error) {
            this.logger.debug(error);
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException(
                'Ocorreu um erro ao buscar transação',
            );
        }
    }
}
