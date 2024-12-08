import { Module } from '@nestjs/common';
import { CreateTransactionService } from './createTransaction/services/createTransaction.service';
import { DatabaseModule } from 'src/shared/database/database.module';
import { CreateTransactionRepository } from './createTransaction/repository/createTransaction.repository';
import { TransactionsController } from '../controller/transaction.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [TransactionsController],
    providers: [CreateTransactionService, CreateTransactionRepository],
})
export class TransationsModule {}
