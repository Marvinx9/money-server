import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionInputDto {
    @ApiProperty({ description: 'descrição da transação' })
    @IsString()
    @IsOptional()
    descricao: string;

    @ApiProperty({ description: 'valor da transação' })
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    preco: number;

    @ApiProperty({ description: 'categoria/natureza da transação' })
    @IsString()
    @IsNotEmpty()
    categoria: string;

    usuario_id?: number;
}
