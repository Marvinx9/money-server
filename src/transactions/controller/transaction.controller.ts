import {
    Body,
    Controller,
    Get,
    Post,
    Query,
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

@Controller('transaction')
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
    async findTransaction(
        @Query() data: FindTransactionInputDto,
        @Req() req: Request,
    ) {
        data.usuario_id = +req.user?.id;
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
        data.user_id = data.user_id ? data.user_id : +req.user?.id;
        await this.createTransactionService.execute(data);
    }
}
