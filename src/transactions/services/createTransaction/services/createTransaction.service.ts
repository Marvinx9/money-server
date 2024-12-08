import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { CreateTransactionRepository } from '../repository/createTransaction.repository';
import { CreateTransactionInputDto } from '../dto/createTransactionInput.dto';

@Injectable()
export class CreateTransactionService {
    private readonly logger = new Logger('CreateTransactionService');

    constructor(
        private readonly createTransactionRepository: CreateTransactionRepository,
    ) {}

    async execute(data: CreateTransactionInputDto) {
        try {
            await this.createTransactionRepository.addTransaction(data);
        } catch (error) {
            this.logger.debug(error);
            throw new InternalServerErrorException(
                'Ocorreu um erro ao realizar a transação',
            );
        }
    }
}
