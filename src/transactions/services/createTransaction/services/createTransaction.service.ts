import {
    BadRequestException,
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
            const user = await this.createTransactionRepository.findUserById(
                data.user_id,
            );

            if (!user) {
                throw new BadRequestException('Usuário não existe');
            }
            data.type = data.type === 'deposit' ? 'D' : 'W';

            await this.createTransactionRepository.addTransaction(data);
        } catch (error) {
            this.logger.debug(error);
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException(
                'Ocorreu um erro ao realizar a transação',
            );
        }
    }
}
