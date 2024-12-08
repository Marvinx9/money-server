import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateTransactionService } from '../services/createTransaction/services/createTransaction.service';
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateTransactionInputDto } from '../services/createTransaction/dto/createTransactionInput.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
    constructor(
        private readonly createTransactionService: CreateTransactionService,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiCreatedResponse({ description: 'transação criada com sucesso' })
    @ApiInternalServerErrorResponse({
        description: 'Ocorreu um erro ao realizar a transação',
    })
    async createTransaction(
        @Req() req: Request,
        @Body() data: CreateTransactionInputDto,
    ) {
        data.usuario_id = data.usuario_id
            ? data.usuario_id
            : Number(req.user?.id);

        await this.createTransactionService.execute(data);
    }
}
