import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { CreateTransactionService } from '../services/createTransaction/services/createTransaction.service';
import {
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateTransactionInputDto } from '../services/createTransaction/dto/createTransactionInput.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { FindTransactionService } from '../services/findTransactionBySearch/services/findTransaction.service';
import { FindTransactionInputDto } from '../services/findTransactionBySearch/dto/findTransactionInput.dto';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
    constructor(
        private readonly createTransactionService: CreateTransactionService,
        private readonly findTransactionService: FindTransactionService,
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({
        description:
            'Busca o histórico de transações do usuário com base no título ou descrição',
    })
    @ApiInternalServerErrorResponse({
        description: 'Ocorreu um erro ao buscar a transação',
    })
    async findTransaction(@Param() data: FindTransactionInputDto) {
        return await this.findTransactionService.execute(data);
    }

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
